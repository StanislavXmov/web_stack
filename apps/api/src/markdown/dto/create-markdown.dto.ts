import { ApiProperty } from "@nestjs/swagger";

export class CreateMarkdownDto {
  @ApiProperty({ example: "Getting Started" })
  title: string;

  @ApiProperty({
    example: "getting-started",
    description: "Unique URL-friendly identifier",
  })
  slug: string;

  @ApiProperty({
    example: "# Getting Started\n\nWelcome to the notes app.",
  })
  content: string;
}
