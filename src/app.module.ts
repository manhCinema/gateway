import { PassportModule } from '@manhdev2/passport'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getPassportConfig } from 'src/core/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AccountModule } from './modules/account/account.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		AuthModule,
		AccountModule,
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService]
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
