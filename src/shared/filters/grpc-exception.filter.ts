import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus
} from '@nestjs/common'
import { Response } from 'express'
import { grpcToHttpStatus } from 'src/shared/utils'

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
	public catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		if (this.isGrpcError(exception)) {
			const httpStatus = grpcToHttpStatus[exception.code] || 500
			return response.status(httpStatus).json({
				statusCode: httpStatus,
				message: exception.details || 'Internal server error'
			})
		}
		if (exception instanceof HttpException) {
			const status = exception.getStatus()
			return response.status(status).json({
				statusCode: status,
				message: exception.message || 'gRPC error'
			})
		}
		return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			statusCode: 500,
			message: 'Internal server error'
		})
	}
	private isGrpcError(exception: any) {
		return (
			typeof exception === 'object' &&
			'code' in exception &&
			'details' in exception
		)
	}
}
