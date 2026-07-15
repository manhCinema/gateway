import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsNotEmpty,
	IsNumberString,
	IsUUID,
	Length
} from 'class-validator'

export class ConfirmEmailChangeRequest {
	@ApiProperty({
		example: 'manhtranduc0202@gmail.com'
	})
	@IsNotEmpty()
	@IsEmail()
	public email!: string

	@ApiProperty({
		description: 'Code',
		example: '123456'
	})
	@IsNotEmpty()
	@IsNumberString()
	@Length(6, 6)
	public code!: string

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000'
	})
	@IsNotEmpty()
	@IsUUID()
	public userId!: string
}
