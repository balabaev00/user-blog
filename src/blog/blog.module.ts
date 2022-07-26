import {UserModule} from "./../user/user.module";
import {DatabaseModule} from "./../database/database.module";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BlogController} from "./blog.controller";
import {BlogService} from "./blog.service";
import {Blog} from "./entity/blog.entity";

@Module({
	imports: [DatabaseModule, UserModule, TypeOrmModule.forFeature([Blog])],
	providers: [BlogService],
	controllers: [BlogController],
	exports: [BlogService],
})
export class BlogModule {}
