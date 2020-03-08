export const getTextNode = (description, text) => {
	const el = document.createElement('p');
	el.textContent = `${description} ${text}`;
	return el;
};

export const transformToJSON = obj => JSON.stringify(obj);
export const transformFromJSON = obj => JSON.parse(obj);
