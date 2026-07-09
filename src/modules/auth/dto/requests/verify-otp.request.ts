import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString, Length, Validate } from 'class-validator'
import { IdentifierValidator } from 'src/shared/validators'

export class VerifyOtpRequest {
	@ApiProperty({
		description: 'Email or phone number to verify OTP',
		example: 'user@example.com'
	})
	@IsString()
	@Validate(IdentifierValidator)
	public identifier!: string

	@ApiProperty({
		description: 'Code',
		example: '123456'
	})
	@IsNotEmpty()
	@IsString()
	@Length(6, 6)
	public code!: string

	@ApiProperty({
		description: 'Type of identifier',
		example: 'email',
		enum: ['email', 'phone']
	})
	@IsString()
	@IsEnum(['email', 'phone'])
	public type!: 'email' | 'phone'
}
