export interface AccessTokenPayload {
	userId: number;
	email: string;
}

export interface BlogResponse {
	id: number;
	name: string;
	createdAt: Date;
	authorId: number;
}

export interface MessageResponse {
	id: number;
	message: string;
	createdAt: Date;
	authorId: number;
}
