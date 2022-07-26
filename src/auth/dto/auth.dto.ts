import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {
	@ApiProperty({
		description: `Email`,
		example: `admin@mail.ru`,
	})
	email: string;

	@ApiProperty({
		description: `Password`,
		example: `123789qwe`,
	})
	password: string;
}

export class LoginDto {
	@ApiProperty({
		description: `Email`,
		example: `admin@mail.ru`,
	})
	email: string;

	@ApiProperty({
		description: `Password`,
		example: `123789qwe`,
	})
	password: string;
}

export class CreateUserReturn201 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `User token`,
		example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbWFpbC5ydSIsImlhdCI6MTY1Nzg5MjU3NSwiZXhwIjoxNjU3ODkzNDc1fQ.i2Hh-ORRf53KNWXiCqxe25z5gHMuL3HZ68xE5yP6OE0`,
	})
	accessToken: string;

	@ApiProperty({
		description: `Status code`,
		example: `201`,
	})
	status: number;
}

export class CreateUserReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `User has not been created`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}

export class LoginUserReturn200 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `User token`,
		example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbWFpbC5ydSIsImlhdCI6MTY1Nzg5MjU3NSwiZXhwIjoxNjU3ODkzNDc1fQ.i2Hh-ORRf53KNWXiCqxe25z5gHMuL3HZ68xE5yP6OE0`,
	})
	accessToken: string;

	@ApiProperty({
		description: `Status code`,
		example: `200`,
	})
	status: number;
}

export class LoginUserReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Password is wrong`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}
