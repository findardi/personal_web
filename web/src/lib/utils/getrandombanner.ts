import banners from '$lib/assets/banner';

/**
 * Returns a random banner from the available banner collection
 * @returns A randomly selected banner image
 */
export const getRandomBanner = () => {
	const randomIndex = Math.floor(Math.random() * banners.length);

	return banners[randomIndex];
};
