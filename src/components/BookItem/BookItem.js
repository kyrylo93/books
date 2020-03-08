import './BookItem.css';
import Gallery from "../Gallery/Gallery";
import EditForm from "../EditForm/EditForm";
import {CustomButton} from "../CustomButton/CustomButton";
import {getTextNode, transformFromJSON} from "../../utils";

const BookItem = (index) => {
	const article = document.createElement('article');
	article.className = 'book';
	
	const li = document.createElement('li');
	li.className = 'bookItem';
	
	const book = transformFromJSON(localStorage.getItem(`book_${index}`));
	li.dataset.bookName = book.name;
	
	const textBlock = document.createElement('section');
	textBlock.className = 'infoBlock';
	
	const deleteArticle = () => {
		li.remove();
		localStorage.removeItem(`book_${index}`);
	};
	
	const deleteButton = CustomButton('Remove from list', deleteArticle);
	
	const showEditForm = () => {
		editForm.style.zIndex = 100;
		editForm.style.opacity = 1;
	};
	
	const hideEditForm = () => {
		editForm.style.zIndex = -10;
		editForm.removeEventListener('transitionend', hideEditForm);
	};
	
	const deleteOldTextInfoValues = () => textBlock.innerHTML = '';
	const deleteOldImages = () => article.querySelector('.imageList').remove();
	
	const clearBookCard = () => {
		deleteOldTextInfoValues();
		deleteOldImages();
	};
	
	const addBookInfoText = () => {
		const book = transformFromJSON(localStorage.getItem(`book_${index}`));
		const {name, author, publisher, publisherAddress, publisherTel, category} = book;
		
		const nameParagraph = getTextNode('Book name:', name);
		const authorParagraph = getTextNode('Book author:', author);
		const publisherParagraph = getTextNode('Publisher:', publisher);
		const publisherAddressParagraph = getTextNode('Publisher address:', publisherAddress);
		const publisherTelParagraph = getTextNode('Publisher tel:', publisherTel);
		const categoryParagraph = getTextNode('Book category:', category);
		
		const paragraphElements = [
			nameParagraph, authorParagraph, publisherParagraph,
			publisherAddressParagraph, publisherTelParagraph, categoryParagraph,
		];
		
		paragraphElements.forEach(paragraph => textBlock.appendChild(paragraph));
	};
	
	const addGallery = () => {
		const gallery = Gallery(index);
		article.appendChild(gallery);
	};
	
	const addTextAndImage = () => {
		addBookInfoText();
		addGallery();
	};
	
	article.appendChild(textBlock);
	const editForm = EditForm(hideEditForm, clearBookCard, addTextAndImage, index, 'Confirm changes');
	const editButton = CustomButton('Edit book', showEditForm);
	const nodeElements = [deleteButton, editButton, editForm];
	nodeElements.forEach(elem => article.appendChild(elem));
	
	addTextAndImage();
	li.appendChild(article);
	return li;
};

export default BookItem;
