import {User} from "./../../user/entity/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import {Message} from "../../message/entity/message.entity";

@Entity({name: `blogs`})
export class Blog {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@CreateDateColumn({name: `created_at`})
	createdAt: Date;

	@ManyToOne(() => User, user => user.blogs)
	@JoinColumn({name: `author_id`})
	author: User;

	@OneToMany(() => Message, message => message.blog)
	messages: Message[];
}
