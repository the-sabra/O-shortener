import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateUrlDto {
  @IsNotEmpty()
  @IsUrl()
  long_url: string;
  @IsNotEmpty()
  urlId: string;
}
