import { env } from '$env/dynamic/private';

export const BASE_API_URL = env.SERVER_API;
export const API_HEALTH = `${BASE_API_URL}/health`;
export const BLOG_POST = `${BASE_API_URL}/blog`;
export const BLOG_GET = `${BASE_API_URL}/blog`;
export const LOGIN_POST = `${BASE_API_URL}/user/login`;
export const VERIFY = `${BASE_API_URL}/user/verify`;
