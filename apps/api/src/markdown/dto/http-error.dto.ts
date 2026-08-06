import { ApiProperty } from "@nestjs/swagger";

export class HttpErrorDto {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: "Failed to fetch markdown list" })
  message: string;

  @ApiProperty({ example: "Internal Server Error" })
  error: string;
}
