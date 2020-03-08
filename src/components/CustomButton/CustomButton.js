export const CustomButton = (text, onClick) => {
	const el = document.createElement('button');
	el.className = 'customButton';
	el.textContent = text;
	
	el.addEventListener('click', onClick);
	return el;
};
