/* eslint-disable @typescript-eslint/no-require-imports */
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { GrpcExceptionFilter } from 'src/shared/filters'

import { AppModule } from './app.module'
import { getCorsConfig, getValidationPipeConfig } from './core/config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const logger = new Logger()

	app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()))
	app.useGlobalFilters(new GrpcExceptionFilter())
	app.enableCors(getCorsConfig(config))
	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Cinema Gateway Service')
		.setDescription('The cinema gateway service API description')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('docs', app, swaggerDocument, {
		yamlDocumentUrl: '/openapi.yaml'
	})

	const port = config.getOrThrow<number>('HTTP_PORT')
	const host = config.getOrThrow<string>('HTTP_HOST')
	await app.listen(port)
	logger.log(`Gateway service is running on ${host}`)
	logger.log(`swagger is running on ${host}/docs`)
}

bootstrap()

// 8 26
