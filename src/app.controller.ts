import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({
		summary: 'Get Hello message',
		description: 'This endpoint returns a hello message from the service.'
	})
	@Get()
	getHello(): string {
		return this.appService.getHello()
	}
}
