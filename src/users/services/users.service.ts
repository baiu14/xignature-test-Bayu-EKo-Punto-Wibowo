import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	  ) {}
		  
	  getUsers() {
		return this.userRepository.find();
	  }
		  
	  findUsersById(id: number) {
		return this.userRepository.findOneBy({id: id});
	  }

	  updateUser(id: number, updateUserDto: UpdateUserDto) {
		// const newUser = this.userRepository.create(updateUserDto);
	  return this.userRepository.update({ id: id },updateUserDto);
	}
}
