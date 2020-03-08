import './styles/normalize.css';
import './styles/style.css'
import {defaultBooks} from "./defaultBooks";
import BookItem from "./components/BookItem/BookItem";
import {transformToJSON, transformFromJSON} from "./utils";
import EditForm from "./components/EditForm/EditForm";

let currentAmount = 0;
const list = document.querySelector('.booksList');

const formSection = document.createElement('section');
formSection.className = 'addNewBookForm';

const hideEditForm = () => {
	form.removeEventListener('transitionend', hideEditForm);
	currentAmount++;
	formSection.style.zIndex = -10;
	form.style.zIndex = -10;
	
	const currentIndex = +(localStorage.getItem('booksAmount'));
	const bookValues = transformFromJSON(localStorage.getItem(`book_${currentIndex - 1}`));
	
	if (bookValues) {
		list.appendChild(BookItem(bookValues, currentIndex - 1));
	}
};

const form = EditForm(
	{},
	hideEditForm,
	null,
	null,
	'new',
	'Add a book'
);

const addDefaultBooks = () => {
	const amountFromStorage = localStorage.getItem('booksAmount');
	
	if (amountFromStorage > 0) {
		currentAmount = amountFromStorage;
	} else {
		localStorage.setItem('booksAmount', 0);
		defaultBooks.forEach(book => {
			localStorage.setItem(`book_${currentAmount}`, transformToJSON(book));
			currentAmount++;
			localStorage.setItem('booksAmount', currentAmount);
		})
	}
};

const renderBooks = () => {
	const booksHtmlNodes = [];

	for (let index = 0; index < currentAmount ; index++) {
		const bookValues = transformFromJSON(localStorage.getItem(`book_${index}`));
		
		if (bookValues) {
			booksHtmlNodes.push(BookItem(bookValues, index));
		}
	}
	
	booksHtmlNodes.forEach(book => list.appendChild(book));
};

const renderAddNewBookButton = () => {
	const button = document.createElement('button');
	button.className = 'addNewBookButton';
	button.textContent = 'Add new book';
	button.addEventListener('click', showBookForm);
	
	const header = document.querySelector('header');
	header.appendChild(button);
};

const renderAddNewBookForm = () => {
	formSection.appendChild(form);
	document.body.appendChild(formSection);
};

const showBookForm = () => {
	formSection.style.zIndex = 100;
	form.style.zIndex = 100;
	form.style.opacity = 1;
};

addDefaultBooks();



renderBooks();
renderAddNewBookButton();
renderAddNewBookForm();

// 	Всего две страницы:
// 	1 - Список книг с возможностью отфильтровать по названию
