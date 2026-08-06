import { ApiProperty } from "@nestjs/swagger";

export class MarkdownDto {
  @ApiProperty({ example: "clxyz0123456789abcdef" })
  id: string;

  @ApiProperty({ example: "Getting Started" })
  title: string;

  @ApiProperty({ example: "getting-started" })
  slug: string;

  @ApiProperty({
    example: "# Getting Started\n\nWelcome to the notes app.",
  })
  content: string;

  @ApiProperty({ example: "2026-08-06T08:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2026-08-06T08:00:00.000Z" })
  updatedAt: Date;
}
