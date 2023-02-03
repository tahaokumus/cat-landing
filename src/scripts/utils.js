export function sitePath(relativeUrl) {
	if (relativeUrl.startsWith('/')) {
		relativeUrl = relativeUrl.substring(1);
	}

	return `${import.meta.env.BASE_URL}${relativeUrl || ''}`;
}
