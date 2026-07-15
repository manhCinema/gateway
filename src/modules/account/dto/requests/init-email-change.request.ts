import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator'

export class InitEmailChangeRequest {
	@ApiProperty({
		example: 'manhtranduc0202@gmail.com'
	})
	@IsNotEmpty()
	@IsEmail()
	public email!: string

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000'
	})
	@IsNotEmpty()
	@IsUUID()
	public userId!: string
}
