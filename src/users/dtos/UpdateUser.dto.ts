import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    phone: string;

    address: string;

    updated_at: string;
}