import {Tag} from "../../tag/entity/tag.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: `users`})
export class User {
	@PrimaryGeneratedColumn(`uuid`)
	id: string;

	@Column({length: 100})
	email: string;

	@Column({length: 100})
	password: string;

	@Column({length: 30})
	nickname: string;

	@OneToMany(() => Tag, tag => tag.creator)
	tags: Tag[];
}
