import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {AuthDto, LoginDto} from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {AccessTokenPayload} from "types";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	/**
	 * It creates a user, generates a token, and returns the token
	 * @param {AuthDto} dto - AuthDto - this is the data transfer object that we created earlier.
	 * @returns The access token is being returned.
	 */
	async signUpLocal(dto: AuthDto) {
		try {
			const user = await this.userService.createUser(dto.email, dto.password);

			const accessToken = this.generateToken({
				userId: user.id,
				email: user.email,
			});

			return accessToken;
		} catch (error) {
			return error;
		}
	}

	/**
	 * It takes a LoginDto as an argument, finds a user by email, checks if the password is correct, and if
	 * it is, it returns a JWT token
	 * @param {LoginDto} dto - LoginDto - The LoginDto is a class that we will create in the next step.
	 * @returns The access token is being returned.
	 */
	async signInLocal(dto: LoginDto) {
		const user = await this.userService.findOneByEmail(dto.email);

		if (!user) throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);

		const isPasswordMatching = await bcrypt.compare(dto.password, user.password);

		if (!isPasswordMatching)
			throw new HttpException(`Password is wrong`, HttpStatus.BAD_REQUEST);

		const accessToken = this.generateToken({
			userId: user.id,
			email: user.email,
		});

		return accessToken;
	}

	/**
	 * It takes an object of type AccessTokenPayload as an argument, and returns a JWT token
	 * @param {AccessTokenPayload} payload - This is the data that we want to encode into the token.
	 * @returns A JWT token
	 */
	private generateToken(payload: AccessTokenPayload) {
		const token = this.jwtService.sign(payload);

		return {
			token,
			expire: this.configService.get<number>(`JWT_EXPIRES_IN`) * 60,
		};
	}

	/**
	 * It takes in a string, and returns a promise that resolves to a boolean
	 * @param {string} accessToken - The access token to validate.
	 * @returns The decoded token.
	 */
	validateRefreshToken(accessToken: string) {
		return this.jwtService.verify(accessToken);
	}
}
