import {
	AccountServiceClient,
	GetAccountRequest
} from '@manhdev2/contracts/gen/account'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

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
}
