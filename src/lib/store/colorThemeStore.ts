import { writable } from 'svelte/store';

const initialTheme =
	typeof localStorage !== 'undefined' ? localStorage.getItem('color-theme') || 'dark' : 'dark';

export const theme = writable(initialTheme);

export const toggleTheme = () => {
	theme.update((currentTheme) => {
		if (currentTheme === 'dark') return 'light';
		return 'dark';
	});
};
