import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateMarkdownDto } from "./dto/create-markdown.dto";
import { HttpErrorDto } from "./dto/http-error.dto";
import { MarkdownDto } from "./dto/markdown.dto";
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
  @ApiOperation({ summary: "Get all markdown", operationId: "getMarkdownList" })
  @ApiResponse({
    status: 200,
    type: [MarkdownDto],
  })
  @ApiResponse({
    status: 500,
    description: "Failed to fetch markdown list",
    type: HttpErrorDto,
  })
  findAll() {
    return this.markdownService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a markdown by id",
    operationId: "getMarkdownById",
  })
  @ApiResponse({
    status: 200,
    type: MarkdownDto,
  })
  @ApiResponse({
    status: 404,
    description: "Markdown not found",
    type: HttpErrorDto,
  })
  findOne(@Param("id") id: string) {
    return this.markdownService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMarkdownDto: UpdateMarkdownDto,
  ) {
    return this.markdownService.update(id, updateMarkdownDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.markdownService.remove(id);
  }
}
