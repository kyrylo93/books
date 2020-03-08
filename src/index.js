import './styles/normalize.css';
import './styles/style.css'
import {defaultBooks} from "./defaultBooks";
import BookItem from "./components/BookItem/BookItem";
import {transformToJSON, transformFromJSON} from "./utils";

let currentAmount = 0;

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

addDefaultBooks();
renderBooks();

// 	Всего две страницы:
// 	1 - Список книг с возможностью отфильтровать по названию
// 2 - Страница добавления новой
