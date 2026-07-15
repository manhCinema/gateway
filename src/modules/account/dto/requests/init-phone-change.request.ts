import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID, Matches } from 'class-validator'

export class InitPhoneChangeRequest {
	@ApiProperty({
		example: '000000000'
	})
	@IsNotEmpty()
	@Matches(/^\+?\d{10,15}$/)
	public phone!: string

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000'
	})
	@IsNotEmpty()
	@IsUUID()
	public userId!: string
}
