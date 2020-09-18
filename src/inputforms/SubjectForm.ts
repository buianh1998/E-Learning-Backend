import { IsString, IsNotEmpty, Length, ValidateIf } from "class-validator";

export class CreateSubjectForm {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  description: string;
}

export class UpdateSubjectForm {
  @ValidateIf((object, value) => value)
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ValidateIf((object, value) => value)
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  imageUrl: string;

  @ValidateIf((object, value) => value)
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  description: string;
}
