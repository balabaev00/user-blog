import {MessageModule} from "./../message/message.module";
import {BlogModule} from "./../blog/blog.module";
import {AuthMiddleware} from "./../auth/middlewares/auth.middleware";
import {AuthModule} from "./../auth/auth.module";
import {MiddlewareConsumer, Module, RequestMethod} from "@nestjs/common";
import {UserModule} from "./../user/user.module";

@Module({
	imports: [AuthModule, UserModule, BlogModule, MessageModule],
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
