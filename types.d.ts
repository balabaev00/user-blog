export interface AccessTokenPayload {
	userId: string;
	email: string;
}

export interface TagResponse {
	name: string;
	sortOrder: number;
	creator: {
		nickname: string;
		uid: string;
	};
}
