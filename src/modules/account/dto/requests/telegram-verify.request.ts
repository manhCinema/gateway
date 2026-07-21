import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TelegramVerifyRequest {
	@ApiProperty({
		example: 'asdasdadsdjvcnsdjv'
	})
	@IsString()
	@IsNotEmpty()
	public tgAuthResult!: string
}
