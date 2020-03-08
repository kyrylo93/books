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

	for (let i = 0; i < currentAmount ; i++) {
		const book = transformFromJSON(localStorage.getItem(`book_${i}`));
		booksHtmlNodes.push(BookItem(book, i));
		
		console.log(book)
		
	}
	
	
	const list = document.querySelector('.booksList');
	booksHtmlNodes.forEach(book => list.appendChild(book));
};

addDefaultBooks();
renderBooks();

// 	Для одной книги указывать разное количество фото, и сделать возможность
// просматривать эти фото.
// 	Всего две страницы:
// 	1 - Список книг с возможностью удалить или отфильтровать по названию
// 2 - Страница добавления новой / редактирование
