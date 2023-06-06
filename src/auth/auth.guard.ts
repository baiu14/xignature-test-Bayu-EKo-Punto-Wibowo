// import { Injectable, ExecutionContext } from '@nestjs/common';
import {
	ExecutionContext,
	Injectable,
  } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/typeorm/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
	
  	public handleRequest(err: unknown, user: User): any {
    	return user;
  	}

  	public async canActivate(context: ExecutionContext): Promise<boolean> {
    	await super.canActivate(context);

		const user = context.switchToHttp().getRequest();
		const request = context.switchToHttp().getRequest();
		const token =  this.extractTokenFromHeader(request);
		return token ? true : false;
  	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}