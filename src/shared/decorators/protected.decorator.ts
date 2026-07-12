import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/shared/guards'

export const Protected = () => applyDecorators(UseGuards(AuthGuard))
