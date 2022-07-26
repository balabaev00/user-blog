import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest();

		if (req.user) return true;

		throw new UnauthorizedException();
	}
}
