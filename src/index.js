import './styles/normalize.css';
import './styles/style.css'
import {defaultBooks} from "./defaultBooks";
import BookItem from "./components/BookItem/BookItem";
import {transformToJSON, transformFromJSON} from "./utils";
import EditForm from "./components/EditForm/EditForm";

let currentAmount = 0;

const formSection = document.createElement('section');
formSection.className = 'addNewBookForm';


const hideEditForm = () => {
	form.removeEventListener('transitionend', hideEditForm);
	formSection.style.zIndex = -10;
	form.style.zIndex = -10;
};

const form = EditForm(
	{},
	hideEditForm,
	() => {},
	() => {},
	false,
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
	
	const list = document.querySelector('.booksList');
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
	
	form.style.opacity = 1;
	form.style.zIndex = 100;
};

addDefaultBooks();
renderBooks();
renderAddNewBookButton();
renderAddNewBookForm();

// 	Всего две страницы:
// 	1 - Список книг с возможностью отфильтровать по названию
