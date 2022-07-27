import {UserModule} from "../user/user.module";
import {DatabaseModule} from "../database/database.module";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagController} from "./tag.controller";
import {TagService} from "./tag.service";
import {Tag} from "./entity/tag.entity";

@Module({
	imports: [DatabaseModule, UserModule, TypeOrmModule.forFeature([Tag])],
	providers: [TagService],
	controllers: [TagController],
	exports: [TagService],
})
export class TagModule {}
