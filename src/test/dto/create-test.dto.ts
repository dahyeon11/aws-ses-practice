import { IsNumber, IsOptional,  IsString, IsBoolean } from "class-validator";

export class CreateTestDto {
    @IsString()
    email: string
}
