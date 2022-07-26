import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {User} from "./entity/user.entity";

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
