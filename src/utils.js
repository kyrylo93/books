export const getTextNode = (description, text) => {
	const el = document.createElement('p');
	el.textContent = `${description} ${text}`;
	return el;
};

export const getButtonNode = (text, onClick) => {
	const el = document.createElement('button');
	el.className = 'customButton';
	el.textContent = text;
	
	el.addEventListener('click', onClick);
	return el;
};
