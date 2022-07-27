import {User} from "../../user/entity/user.entity";
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

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

	@ManyToMany(() => User, user => user.tags)
	@JoinTable({
		name: "tags_and_users",
		joinColumn: {
			name: "user_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "tag_id",
			referencedColumnName: "id",
		},
	})
	users: User[];
}
