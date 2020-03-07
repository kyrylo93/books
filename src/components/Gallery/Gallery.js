import './gallery.css';

const Gallery = (imagesLinks) => {
	let currIndex = 0;
	const maxIndex = imagesLinks.length - 1;
	
	const buttons = [
		{text: 'To left', className: 'toLeftBtn'},
		{text: 'To right', className: 'toRightBtn'}
	];
	
	const imageList = document.createElement('ul');
	imageList.className = 'imageList';
	
	const renderImages = () => {
		imagesLinks.forEach(link => {
			const image = document.createElement('img');
			image.src = link;
			image.alt = 'gallery image';
			image.style.margin = '0 auto';
			
			const li = document.createElement('li');
			li.appendChild(image);
			imageList.appendChild(li);
		});
	};
	
	const renderButtons = () => {
		buttons.forEach(({text,className}) => {
			const button = document.createElement('button');
			button.textContent = text;
			button.className = `${className} arrow`;
			
			button.addEventListener('click', () => onButtonCLick(className));
			imageList.appendChild(button);
		});
	};
	
	const onButtonCLick = (className) => {
		if (className === 'toRightBtn' ) {
			currIndex = currIndex === maxIndex ? 0 : currIndex + 1;
		} else {
			currIndex = currIndex === 0 ? maxIndex : currIndex - 1;
		}
		
		showCurrImage();
	};
	
	const showCurrImage = () => {
		imgList.forEach(el => el.style.display = 'none');
		imgList[currIndex].style.display = 'block';
	};
	
	renderImages();
	const imgList = imageList.querySelectorAll('img');
	renderButtons();
	showCurrImage();
	return imageList;
};

export default Gallery;


















