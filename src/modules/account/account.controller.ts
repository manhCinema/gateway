import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'
import { CurrentUser, Protected } from 'src/shared/decorators'

import { AccountClientGrpc } from './account.grpc'
import {
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest
} from './dto/requests'

@Controller('account')
export class AccountController {
	public constructor(private readonly accountClientGrpc: AccountClientGrpc) {}

	@ApiOperation({
		summary: 'Get account information',
		description: 'Get current user account information'
	})
	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAccount(@CurrentUser() userId: string) {
		return await lastValueFrom(
			this.accountClientGrpc.getAccount({ id: userId })
		)
	}

	@ApiOperation({
		summary: 'Initialize email change',
		description: 'Send a verification code to the new email address'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('email/init')
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ transform: true }))
	public async initEmailChange(
		@Body() request: InitEmailChangeRequest,
		@CurrentUser() userId: string
	) {
		return await lastValueFrom(
			this.accountClientGrpc.initEmailChange({
				...request,
				userId
			})
		)
	}

	@ApiOperation({
		summary: 'Confirm email change',
		description: 'Confirm the email change with the verification code'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('email/confirm')
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ transform: true }))
	public async confirmEmailChange(
		@Body() request: ConfirmEmailChangeRequest,
		@CurrentUser() userId: string
	) {
		return await lastValueFrom(
			this.accountClientGrpc.confirmEmailChange({
				...request,
				userId
			})
		)
	}

	@ApiOperation({
		summary: 'Initialize phone change',
		description: 'Send a verification code to the new phone number'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('phone/init')
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ transform: true }))
	public async initPhoneChange(
		@Body() request: InitPhoneChangeRequest,
		@CurrentUser() userId: string
	) {
		return await lastValueFrom(
			this.accountClientGrpc.initPhoneChange({
				...request,
				userId
			})
		)
	}

	@ApiOperation({
		summary: 'Confirm phone change',
		description: 'Confirm the phone change with the verification code'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('phone/confirm')
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ transform: true }))
	public async confirmPhoneChange(
		@Body() request: ConfirmPhoneChangeRequest,
		@CurrentUser() userId: string
	) {
		return await lastValueFrom(
			this.accountClientGrpc.confirmPhoneChange({
				...request,
				userId
			})
		)
	}
}
