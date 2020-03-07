import './styles/normalize.css';
import './styles/style.css'

import BookItem from "./components/BookItem/BookItem";

if (module.hot) {
	module.hot.accept()
}

const book = BookItem('History', 'Jack J', 'Homeless LTD',
	'Mirror str, 20', '+328038203', "horror");

const list = document.querySelector('.booksList');


list.appendChild(book);






// 3. Хранение данных реализовать в localstorage или web sql database с
// возможностью в любой момент переключиться на работу с данными на сервере
// без глобальных изменений в исходном коде приложения.

// 7. Будет плюсом ссылка на приложение, развернутое на каком-нибудь бесплатном
// хостинге.
//
// Исходные данные: название книги, фото книги, авторы книги, дата издательства,
// 	названия издательства, адрес издательства, телефон издательства, рубрика книги.
// 	Для одной книги указывать разное количество фото, и сделать возможность
// просматривать эти фото.
// 	Всего две страницы:
// 	1 - Список книг с возможностью удалить или отфильтровать по названию
// 2 - Страница добавления новой / редактирование


// dynamic import
// button.addEventListener('click', () => {
// 	import( "./chat").then(chat => {
// 		chat.init()
// 	})
// });
