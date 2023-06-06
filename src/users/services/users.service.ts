import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}
		  
	async getUsers(): Promise<{}> {
		const user = await this.userRepository.find();
		const res = {
			statusCode: HttpStatus.OK,
			message: "List User!",
			data: {
				user 
			}
		}
		return res;
	}
		  
	async findUsersById(id: number): Promise<{}> {
		const detail = await this.userRepository.findOneBy({id: id});
		const res = {
			statusCode: HttpStatus.OK,
			message: "Detail User!",
			data: {
				detail: detail
			}
		}
		return res;
	}

	async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{}> {
	  	await this.userRepository.update({ id: id },updateUserDto);
	  	const res = {
			statusCode: HttpStatus.OK,
			message: "user updated!!",
			data: {
			}
		}
		return res;
	}
}
