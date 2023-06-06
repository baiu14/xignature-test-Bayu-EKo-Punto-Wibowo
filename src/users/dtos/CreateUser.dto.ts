import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    phone: string;

    address: string;

    created_at: string;
}