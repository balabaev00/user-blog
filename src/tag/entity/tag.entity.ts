import {User} from "../../user/entity/user.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: `tags`})
export class Tag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: 40})
	name: string;

	@Column({name: `sort_order`, type: `int`, default: 0})
	sortOrder: number;

	@ManyToOne(() => User, user => user.tags)
	@JoinColumn({name: `creator_id`})
	creator: User;
}
