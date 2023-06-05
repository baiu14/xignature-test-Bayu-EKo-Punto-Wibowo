import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, UsePipes, ValidationPipe} from '@nestjs/common';
import { User } from 'src/typeorm/user.entity';
import { LoginDto } from '../dtos/auth.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { JwtAuthGuard } from '../auth.guard';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<User>user);
  }

  @Post('register')
	@UsePipes(ValidationPipe)
	async createUsers(@Body() createUserDto: CreateUserDto) {
		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
		var timestamp = new Date().toISOString();
		const data = {
			username: createUserDto.username,
			password: hashedPassword,
			email: createUserDto.email,
			phone: createUserDto.phone,
			address: createUserDto.address,
			created_at: timestamp,
		}
	  return this.service.register(data);
	}
}