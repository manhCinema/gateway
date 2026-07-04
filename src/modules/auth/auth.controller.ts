import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { SendOtpRequest } from './dto'
import { ApiOperation } from '@nestjs/swagger'
@Controller('auth')
export class AuthController {
  @ApiOperation({
    summary: 'Send OTP',
    description: 'Send OTP to email or phone number'
    
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('otp/send')
  @HttpCode(HttpStatus.OK)
  public async sendOtp(@Body() request: SendOtpRequest) {}
}
