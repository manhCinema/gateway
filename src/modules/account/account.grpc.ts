import {
	AccountServiceClient,
	GetAccountRequest
} from '@manhdev2/contracts/gen/account'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import {
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest
} from 'src/modules/account/dto/requests'

@Injectable()
export class AccountClientGrpc implements OnModuleInit {
	private accountServiceClient!: AccountServiceClient

	public constructor(
		@Inject('ACCOUNT_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.accountServiceClient =
			this.client.getService<AccountServiceClient>('AccountService')
	}
	public getAccount(request: GetAccountRequest) {
		return this.accountServiceClient.getAccount(request)
	}

	public initEmailChange(request: InitEmailChangeRequest) {
		return this.accountServiceClient.initEmailChange(request)
	}
	public confirmEmailChange(request: ConfirmEmailChangeRequest) {
		return this.accountServiceClient.confirmEmailChange(request)
	}
	public initPhoneChange(request: InitPhoneChangeRequest) {
		return this.accountServiceClient.initPhoneChange(request)
	}
	public confirmPhoneChange(request: ConfirmPhoneChangeRequest) {
		return this.accountServiceClient.confirmPhoneChange(request)
	}
}
