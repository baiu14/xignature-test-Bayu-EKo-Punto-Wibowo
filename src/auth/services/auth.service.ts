import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/auth.dto';
import { AuthHelper } from '../auth.helper';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async login(body: LoginDto): Promise<{}> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { last_login_at: new Date() });
	const res = {
		statusCode: HttpStatus.OK,
		message: "Login Success!",
		data: {
			token: `Bearer ` + this.helper.generateToken(user) 
		}
	}
    return res;
  }

  public async refresh(user: User): Promise<{}> {
    this.repository.update(user.id, { last_login_at: new Date() });
	const res = {
		statusCode: HttpStatus.OK,
		message: "Login Success!",
		data: {
			token: `Bearer ` + this.helper.generateToken(user) 
		}
	}
    return res;
  }

  public async register(createUserDto: CreateUserDto): Promise<{}> {
	const newUser = this.repository.create(createUserDto);
  	this.repository.save(newUser);
	const res = {
		statusCode: HttpStatus.OK,
		message: "Registration Success!",
		data: {
			newUser
		}
	}
	return res;
  }
}