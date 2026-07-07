import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AuthClientGrpc } from './auth.grpc'
import { SendOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	public constructor(private readonly authClientGrpc: AuthClientGrpc) {}

	@ApiOperation({
		summary: 'Send OTP',
		description: 'Send OTP to email or phone number'
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public async sendOtp(@Body() request: SendOtpRequest) {
		return this.authClientGrpc.sendOtp(request)
	}
}
