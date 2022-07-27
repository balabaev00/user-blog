import {MiddlewareConsumer, Module, RequestMethod} from "@nestjs/common";
import {AuthModule} from "src/auth/auth.module";
import {AuthMiddleware} from "src/auth/middlewares/auth.middleware";
import {TagModule} from "src/tag/tag.module";
import {UserModule} from "src/user/user.module";

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
