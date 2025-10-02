export type blogType = {
	id: number;
	title: string;
	slug: string;
	banner: string | null;
	content: string;
	description: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
};
