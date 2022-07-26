import {Message} from "./../../message/entity/message.entity";
import {Blog} from "./../../blog/entity/blog.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: `users`})
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Blog, blog => blog.author)
	blogs: Blog[];

	@OneToMany(() => Message, message => message.author)
	messages: Message[];
}
