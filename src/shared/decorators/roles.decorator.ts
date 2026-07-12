import { SetMetadata } from '@nestjs/common'

enum Role {
	USER = 0,
	ADMIN = 1,
	UNRECOGNIRED = -1
}
export const ROLES_KEY = 'required_roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
