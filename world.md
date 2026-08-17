# World

Две сцены на одном ECS:

- `/world` — демо-рой: 1000 агентов, OrbitControls
- `/world/player` — игрок (WASD / клик по земле) + тот же NPC-рой, камера едет за игроком

Симуляция живёт в ECS (koota), картинка — в R3F, кнопки и пауза — в React + Zustand.

Правило слоёв: **ECS описывает, что существует и что происходит. R3F описывает, как это выглядит. Zustand описывает только UI.**

## Как запустить

```bash
bun run dev:web
```

Открой `/world` или `/world/player`. Three.js грузится только на клиенте (`ssr: false` в loader).

## Как пользоваться сценой

### `/world`

| Действие | Что происходит |
|---|---|
| ЛКМ + движение | OrbitControls: вращение камеры |
| Pause / `Space` | Останавливает time / wander / movement. Картинка остаётся. |
| Grid | Показывает или прячет пол |
| Time scale | Множитель `delta` (0.25x–2x) |
| Spawn 1000 | Добирает агентов в свободные слоты `0…999`. Если рой полный — ничего не делает |
| Reset / `R` | Уничтожает всех агентов и спавнит 1000 заново |

### `/world/player`

| Действие | Что происходит |
|---|---|
| WASD / стрелки | Игрок ходит по плоскости `y = 0`, относительно камеры |
| Клик по земле | Игрок идёт в точку. WASD важнее клика |
| Pause / `Space` | Симуляция стоп, камера и картинка остаются |
| Reset / `R` | Респавн игрока и 1000 NPC |

Игрок — отдельная сущность (`Player`), не в `InstancedMesh`. NPC — `Agent` + instance. Камера chase, без OrbitControls.

Счётчик агентов обновляется только при spawn/destroy. FPS в HUD троттлится (~4 Гц) и не идёт в Zustand.

## Слои

```
apps/web/src/app/world/
  page.tsx                         /world — демо-рой
  player/page.tsx                  /world/player — игрок + NPC
  layout.tsx                       fullscreen
  _components/
    world-app-loader.tsx           client + dynamic ssr:false
    world-app.tsx                  WorldProvider + HUD + Canvas
    store.ts                       Zustand: paused, timeScale, showGrid
    ui/world-hud.tsx
    presentation/                  Canvas, instancedMesh, lights, loop
    play/                          player scene: canvas, HUD, camera, input
    ecs/                           world, traits, actions, systems
    services/                      clock, bounds, rng, input
```

Поток кадра:

1. `useFrame` читает `paused` / `timeScale` через `useWorldStore.getState()` — без подписки, Canvas не ре-рендерится.
2. `runSchedule`: `updateTime` → `wander` → `movement`. На паузе эти три пропускаются.
3. `syncInstances` всегда пишет матрицы в один `InstancedMesh`.

1000 позиций не кладутся в React state. Один draw call, не 1000 `<mesh>`.

## ECS

Сущность — id. Данные — traits. Поведение — systems по query.

Текущие traits: `Agent`, `Player`, `Position`, `Velocity`, `Color`, `Instance`, `Wander`, `MoveTarget`, `Input`, `Time` (singleton мира), `SwarmMesh` (ссылка на Three.js mesh).

`/world` спавнит только `Agent`. `/world/player` добавляет одну сущность `Player` без `Instance`.

Спавн только через `createActions` / `useActions` — так koota безопасно меняет мир из React:

```ts
world.spawn(
  Agent,
  Instance({ index }),
  Position({ x, y, z }),
  Velocity({ x, y, z }),
  Color(color),
  Wander({ nextAt }),
);
```

Индекс инстанса — `Instance.index`, не `entity.id()`. У koota id не обязан быть плотным `0…N`.

## Как расширять

### Новый тип объекта

1. Trait в `_components/ecs/traits.ts`.
2. Спавн в `_components/ecs/actions.ts`.
3. System с `world.query(...)` в `_components/ecs/systems/`.
4. Подключить system в `run-schedule.ts`.

Пример system:

```ts
world.query(Position, Velocity, Agent).updateEach(([position, velocity]) => {
  position.x += velocity.x * delta;
});
```

`useQuery` в React — только для HUD (количество, выбранная сущность). Не маппить query на 1000 компонентов.

### Изменить поведение роя

- Скорость, размер мира, число агентов — `_components/ecs/constants.ts`
- ИИ направления — `systems/wander.ts`
- Интеграция и отскок от стен — `systems/movement.ts` + `services/bounds.ts`

`bounds` можно позже заменить на physics engine. Three.js в этот слой не тащить.

### Кнопка в HUD

UI-флаг (пауза, сетка, скорость времени) — в `store.ts`. Мутация мира (спавн, reset) — `useActions(worldActions)`. Симуляция читает store только через `getState()` внутри `useFrame`.

### Уникальный объект (не рой)

Игрок на `/world/player` — отдельный `<mesh>`, позицию читает `useFrame` + `queryFirst(Player)`, не `useTrait` (иначе 60 ре-рендеров/сек). Для сотен одинаковых мешей — только instancing, как `swarm-instances.tsx`.

## Чего не делать

- Не создавать 1000 React-компонентов и не подписываться на `useTrait(Position)` у каждого агента.
- Не класть позиции/velocity в Zustand.
- Не вызывать `world.destroy()` в React unmount: Strict Mode вернёт тот же мёртвый мир.
- Не оборачивать Canvas layout-level View Transition.
- Не вызывать `dynamic(..., { ssr: false })` из Server Component — только из клиента (`world-app-loader.tsx`).
