import {Tag} from "../../tag/entity/tag.entity";
import {Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

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

	@ManyToMany(() => Tag, tag => tag.users)
	tags: Tag[];
}
