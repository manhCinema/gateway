import { AuthServiceClient, SendOtpRequest } from '@manhdev2/contracts/gen/auth'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private authService!: AuthServiceClient

	public constructor(
		@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.authService =
			this.client.getService<AuthServiceClient>('AuthService')
	}

	public sendOtp(data: SendOtpRequest) {
		return this.authService.sendOtp(data)
	}
}
