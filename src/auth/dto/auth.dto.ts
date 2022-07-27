import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsEmail, IsString, Matches} from "class-validator";

export class TokenResponse {
	@ApiProperty({
		description: `Token`,
		example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbWFpbC5ydSIsImlhdCI6MTY1Nzg5MjU3NSwiZXhwIjoxNjU3ODkzNDc1fQ.i2Hh-ORRf53KNWXiCqxe25z5gHMuL3HZ68xE5yP6OE0`,
	})
	token: string;

	@ApiProperty({
		description: `Expire token`,
		example: 1800,
	})
	expire: 1800;
}
export class AuthDto {
	@ApiProperty({
		description: `Email`,
		example: `admin@mail.ru`,
	})
	@IsString()
	@IsEmail()
	@IsDefined()
	email: string;

	@ApiProperty({
		description: `Password`,
		example: `123789qwe`,
	})
	@IsString()
	@IsDefined()
	@Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
		message: `Passwor must has a 1 one character, 1 number and his size must be >=8`,
	})
	password: string;

	@ApiProperty({
		description: `Nickname`,
		example: `Admin3000`,
	})
	@IsDefined()
	@IsString()
	nickname: string;
}

export class LoginDto {
	@ApiProperty({
		description: `Email`,
		example: `admin@mail.ru`,
	})
	@IsDefined()
	@IsString()
	email: string;

	@ApiProperty({
		description: `Password`,
		example: `123789qwe`,
	})
	@IsDefined()
	@IsString()
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
		example: {
			token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbWFpbC5ydSIsImlhdCI6MTY1Nzg5MjU3NSwiZXhwIjoxNjU3ODkzNDc1fQ.i2Hh-ORRf53KNWXiCqxe25z5gHMuL3HZ68xE5yP6OE0`,
			expire: 1800,
		},
	})
	value: TokenResponse;

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
		example: {
			token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbWFpbC5ydSIsImlhdCI6MTY1Nzg5MjU3NSwiZXhwIjoxNjU3ODkzNDc1fQ.i2Hh-ORRf53KNWXiCqxe25z5gHMuL3HZ68xE5yP6OE0`,
			expire: 1800,
		},
	})
	value: TokenResponse;

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

export class LogoutUserReturn200 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Message`,
		example: `User has been logged out`,
	})
	message: string;

	@ApiProperty({
		description: `Status code`,
		example: `200`,
	})
	status: number;
}
