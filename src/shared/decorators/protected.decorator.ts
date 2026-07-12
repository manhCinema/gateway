import { applyDecorators, UseGuards } from '@nestjs/common'
import { Roles } from 'src/shared/decorators/roles.decorator'
import { AuthGuard, RolesGuard } from 'src/shared/guards'

enum Role {
	USER = 0,
	ADMIN = 1,
	UNRECOGNIRED = -1
}
export const Protected = (...roles: Role[]) => {
	if (roles.length === 0) return applyDecorators(UseGuards(AuthGuard))
	return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
}
