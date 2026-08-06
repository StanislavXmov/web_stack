import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateMarkdownDto } from "./dto/create-markdown.dto";
import { UpdateMarkdownDto } from "./dto/update-markdown.dto";
import { MarkdownService } from "./markdown.service";

@Controller("markdown")
export class MarkdownController {
  constructor(private readonly markdownService: MarkdownService) {}

  @Post()
  create(@Body() createMarkdownDto: CreateMarkdownDto) {
    return this.markdownService.create(createMarkdownDto);
  }

  @Get()
  findAll() {
    return this.markdownService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.markdownService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMarkdownDto: UpdateMarkdownDto,
  ) {
    return this.markdownService.update(+id, updateMarkdownDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.markdownService.remove(+id);
  }
}
