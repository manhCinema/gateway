import { PassportService } from '@manhdev2/passport'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly passportService: PassportService) {}
	public canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest()
		const token = this.extractToken(request)
		if (!token) throw new UnauthorizedException('Token not provided')
		const res = this.passportService.verify(token)
		if (!res.valid) throw new UnauthorizedException(res.reason)
		request.user = {
			id: res.userId
		}
		return true
	}

	private extractToken(request: Request) {
		const header = request.headers.authorization

		if (!header)
			throw new UnauthorizedException('Authorization header missing')

		if (!header.startsWith('Bearer '))
			throw new UnauthorizedException('Invalid authorization')

		const token = header.replace(/^Bearer\s+/i, '').trim()

		if (!token) throw new UnauthorizedException('Token empty')

		return token
	}
}
