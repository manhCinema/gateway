import { PROTO_PATHS } from '@manhdev2/contracts'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AccountModule } from 'src/modules/account/account.module'
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
						protoPath: PROTO_PATHS.AUTH,
						url: configService.getOrThrow('AUTH_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		]),
		AccountModule
	],
	controllers: [AuthController],
	providers: [AuthClientGrpc]
})
export class AuthModule {}
