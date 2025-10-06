export type portfolioContent = {
	no: string;
	title: string;
	description: string;
	tech: string[];
	github?: string;
	demo?: string;
	website?: string;
};

export const portfolioContents: portfolioContent[] = [
	{
		no: '01.',
		title: 'Personal Website',
		description: 'A website that showcases my personal branding and online presence',
		tech: ['sveltekit', 'hono', 'bun', 'postgres', 'docker'],
		github: 'https://github.com/findardi/personal_web'
	},

	{
		no: '02.',
		title: 'Internal Denso Vaning System',
		description:
			'A private internal vaning system for Denso Indonesia, built for management purposes',
		tech: ['nextjs', 'nestjs', 'bun', 'pnpm', 'postgres', 'docker']
	}
];
