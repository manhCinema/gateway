import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsString, Validate } from 'class-validator'
import { IdentifierValidator } from 'src/shared/validators'
export class SendOtpRequest {
  @ApiProperty({
    description: 'Email or phone number to send OTP',
    example: 'user@example.com'
  })
  @IsString()
  @Validate(IdentifierValidator)
  public identifier!: string

  @ApiProperty({
    description: 'Type of identifier',
    example: 'email',
    enum: ['email', 'phone']
  })
  @IsString()
  @IsEnum(['email', 'phone'])
  public type!: 'email' | 'phone'
}
