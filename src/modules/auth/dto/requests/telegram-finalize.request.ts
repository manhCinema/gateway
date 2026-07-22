import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TelegramFinalizeRequest {
	@ApiProperty({
		example: 'sdfsfwerfsajcj'
	})
	@IsString()
	@IsNotEmpty()
	public sessionId!: string
}
