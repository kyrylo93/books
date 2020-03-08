import './gallery.css';

const Gallery = ({imagesLinks}) => {
	const buttons = [
		{text: 'To left', className: 'toLeftBtn'},
		{text: 'To right', className: 'toRightBtn'}
	];
	
	const imageList = document.createElement('ul');
	imageList.className = 'imageList';
	
	const renderImages = () => {
		imagesLinks.forEach(link => {
			const image = document.createElement('img');
			image.className = 'galleryImage';
			image.alt = 'gallery image';
			image.src = link;
			
			const li = document.createElement('li');
			li.appendChild(image);
			imageList.appendChild(li);
		});
	};
	
	const renderButtons = () => {
		buttons.forEach(({text,className}) => {
			const button = document.createElement('button');
			button.className = `${className} arrow`;
			button.textContent = text;
			
			button.addEventListener('click', () => onButtonCLick(className));
			imageList.appendChild(button);
		});
	};
	
	let currentIndex = 0;
	const maxIndex = imagesLinks.length - 1;
	
	const onButtonCLick = (className) => {
		if (className === 'toRightBtn') {
			currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
		} else {
			currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
		}
		
		showCurrentImage();
	};
	
	const showCurrentImage = () => {
		imgList.forEach(el => el.style.display = 'none');
		imgList[currentIndex].style.display = 'block';
	};
	
	// TODO if 1 image => don't render buttons
	renderImages();
	renderButtons();
	
	const imgList = imageList.querySelectorAll('img');
	showCurrentImage();
	
	return imageList;
};

export default Gallery;


















