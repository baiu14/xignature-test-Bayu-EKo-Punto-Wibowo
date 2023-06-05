import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
	UsePipes,
	UseInterceptors,
	ValidationPipe,
	} from '@nestjs/common';
	import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
	import { UsersService } from 'src/users/services/users.service';
	import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}
  
	@Get()
	// @UseGuards(JwtAuthGuard)
  	// @UseInterceptors(ClassSerializerInterceptor)
	getUsers() {
	  return this.userService.getUsers();
	}
	
	@Get('id/:id')
	findUsersById(@Param('id', ParseIntPipe) id: number) {
	  return this.userService.findUsersById(id);
	}
	
	@Post('id/:id')
	@UsePipes(ValidationPipe)
	async updateUsers(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		var timestamp = new Date().toISOString();
		const data = {
			username: updateUserDto.username,
			email: updateUserDto.email,
			phone: updateUserDto.phone,
			address: updateUserDto.address,
			updated_at: timestamp,
		}
	  return this.userService.updateUser(id, data);
	}
}
