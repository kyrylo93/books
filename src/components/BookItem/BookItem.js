import './BookItem.css';
import Gallery from "../Gallery/Gallery";
import {getTextNode, getButtonNode} from "../../utils";

const BookItem = (name, author, publisher, publisherAddress, publisherTel, category, imagesLinks) => {
	
	const article = document.createElement('article');
	article.className = 'book';
	
	const li = document.createElement('li');
	li.className = 'bookItem';
	
	const nameParagraph = getTextNode('Book name:', name);
	const authorParagraph = getTextNode('Book author:', author);
	const publisherParagraph = getTextNode('Publisher:', publisher);
	const publisherAddressParagraph = getTextNode('Publisher address:', publisherAddress);
	const publisherTelParagraph = getTextNode('Publisher tel:', publisherTel);
	const categoryParagraph = getTextNode('Book category:', category);
	const gallery = Gallery(imagesLinks);
	
	const deleteArticle = () => li.remove();
	const deleteButton = getButtonNode('Remove from list', deleteArticle);
	
	const nodeElements = [nameParagraph, authorParagraph, publisherParagraph,
		publisherAddressParagraph, publisherTelParagraph, categoryParagraph, deleteButton, gallery];
	
	nodeElements.forEach(elem => article.appendChild(elem));
	
	li.appendChild(article);
	return li;
};

export default BookItem;
