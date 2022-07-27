import {TagModule} from "../tag/tag.module";
import {AuthMiddleware} from "./../auth/middlewares/auth.middleware";
import {AuthModule} from "./../auth/auth.module";
import {MiddlewareConsumer, Module, RequestMethod} from "@nestjs/common";
import {UserModule} from "./../user/user.module";

@Module({
	imports: [AuthModule, UserModule, TagModule],
	controllers: [],
	providers: [],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes({
			path: "*",
			method: RequestMethod.ALL,
		});
	}
}
