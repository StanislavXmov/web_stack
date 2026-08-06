import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMarkdownDto } from "./dto/create-markdown.dto";
import { UpdateMarkdownDto } from "./dto/update-markdown.dto";

@Injectable()
export class MarkdownService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMarkdownDto: CreateMarkdownDto) {
    try {
      return await this.prisma.markdown.create({
        data: createMarkdownDto,
      });
    } catch (error) {
      this.handlePrismaError(error, createMarkdownDto.slug);
    }
  }

  async findAll() {
    try {
      return await this.prisma.markdown.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch {
      throw new InternalServerErrorException("Failed to fetch markdown list");
    }
  }

  async findOne(id: string) {
    const markdown = await this.prisma.markdown.findUnique({
      where: { id },
    });

    if (!markdown) {
      throw new NotFoundException(`Markdown #${id} not found`);
    }

    return markdown;
  }

  async update(id: string, updateMarkdownDto: UpdateMarkdownDto) {
    try {
      return await this.prisma.markdown.update({
        where: { id },
        data: updateMarkdownDto,
      });
    } catch (error) {
      this.handlePrismaError(error, updateMarkdownDto.slug, id);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.markdown.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error, undefined, id);
    }
  }

  private handlePrismaError(error: unknown, slug?: string, id?: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Markdown #${id} not found`);
      }

      if (error.code === "P2002") {
        throw new ConflictException(
          slug
            ? `Markdown with slug "${slug}" already exists`
            : "Markdown with this slug already exists",
        );
      }
    }

    throw error;
  }
}
