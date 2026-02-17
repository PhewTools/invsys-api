import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(63)
  @Matches(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, {
    message: 'slug must be lowercase alphanumeric with underscores only',
  })
  readonly slug: string;
}
