import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AuthClientGrpc } from 'src/modules/auth/auth.grpc'

import { AuthController } from './auth.controller'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'AUTH_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'auth.v1',
						protoPath:
							'node_modules/@manhdev2/contracts/proto/auth.proto',
						url: configService.getOrThrow('AUTH_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [AuthController],
	providers: [AuthClientGrpc]
})
export class AuthModule {}
