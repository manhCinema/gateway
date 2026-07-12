import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { lastValueFrom } from 'rxjs'

import { AuthClientGrpc } from './auth.grpc'
import { SendOtpRequest, VerifyOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly authClientGrpc: AuthClientGrpc,
		private readonly configService: ConfigService
	) {}

	@ApiOperation({
		summary: 'Send OTP',
		description: 'Send OTP to email or phone number'
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public async sendOtp(@Body() request: SendOtpRequest) {
		return await lastValueFrom(this.authClientGrpc.sendOtp(request))
	}

	@ApiOperation({
		summary: 'Verify OTP',
		description: 'Verify OTP'
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	@Post('otp/verify')
	@HttpCode(HttpStatus.OK)
	public async verifyOtp(
		@Body() request: VerifyOtpRequest,
		@Res({ passthrough: true }) res: Response
	) {
		try {
			const response = await lastValueFrom(
				this.authClientGrpc.verifyOtp(request)
			)

			const { accessToken, refreshToken } = response

			const cookieDomain =
				this.configService.getOrThrow<string>('COOKIES_DOMAIN')

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				domain: cookieDomain,
				sameSite: 'lax',
				maxAge: 30 * 24 * 60 * 60 * 1000
			})

			return accessToken
		} catch (error) {
			console.error('❌ Gateway verifyOtp Error:', error)
			throw error
		}
	}

	@ApiOperation({
		summary: 'Refresh token',
		description: 'Refresh token'
	})
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	public async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshToken = req.cookies.refreshToken
		const { accessToken, refreshToken: newRefreshToken } =
			await lastValueFrom(this.authClientGrpc.refresh({ refreshToken }))

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000
		})

		return { accessToken }
	}

	@ApiOperation({
		summary: 'Logout',
		description: 'Logout'
	})
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		res.cookie('refreshToken', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			expires: new Date(0)
		})
		return { ok: true }
	}
}
