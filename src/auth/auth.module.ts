import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {AuthGuard} from "./guards/auth.guard";

@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>(`JWT_ACCESS_SECRET`),
				signOptions: {expiresIn: configService.get<string>(`JWT_EXPIRES_IN`)},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, AuthGuard],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
