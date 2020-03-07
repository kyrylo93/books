import './BookItem.css';

const BookItem = (name, author, publisher, publisherAddress, publisherTel, category) => {
	const nameParagraph = getNode('Book name:', name);
	const authorParagraph = getNode('Book author:', author);
	const publisherParagraph = getNode('Publisher:', publisher);
	const publisherAddressParagraph = getNode('Publisher address:', publisherAddress);
	const publisherTelParagraph = getNode('Publisher tel:', publisherTel);
	const categoryParagraph = getNode('Book category:', category);
	
	const nodeElements = [nameParagraph, authorParagraph, publisherParagraph,
		publisherAddressParagraph, publisherTelParagraph, categoryParagraph];
	
	const article = document.createElement('article');
	article.className = 'book';
	
	nodeElements.forEach(elem => article.appendChild(elem));
	
	const li = document.createElement('li');
	li.className = 'bookItem';
	li.appendChild(article);
	return li;
};

const getNode = (description, text) => {
	const el = document.createElement('p');
	el.textContent = `${description} ${text}`;
	return el;
};

export default BookItem;
