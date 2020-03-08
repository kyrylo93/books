import './BookItem.css';
import Gallery from "../Gallery/Gallery";
import {getTextNode, transformFromJSON} from "../../utils";
import {CustomButton} from "../CustomButton/CustomButton";
import EditForm from "../EditForm/EditForm";

const BookItem = (props, index) => {
	// TODO why i need props here, i cann take it from localStorage
	const article = document.createElement('article');
	article.className = 'book';
	
	const li = document.createElement('li');
	li.className = 'bookItem';
	
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
	
	addBookInfoText();
	article.appendChild(textBlock);
	const gallery = Gallery(props);
	const editForm = EditForm(props, hideEditForm, deleteOldTextInfoValues, addBookInfoText, index, 'Confirm changes');
	const editButton = CustomButton('Edit book', showEditForm);
	const nodeElements = [deleteButton, editButton, gallery, editForm];
	nodeElements.forEach(elem => article.appendChild(elem));
	li.appendChild(article);
	
	return li;
};

export default BookItem;
