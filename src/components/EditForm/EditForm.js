import './EditForm.css';
import {transformToJSON} from "../../utils";
import {CustomButton} from "../CustomButton/CustomButton";

const EditForm = (props, hideEditForm, deleteOldTextInfoValues, addBookInfoText, index, buttonText) => {

	const {name, author, publisher, publisherAddress, publisherTel, category, imagesLinks = []} = props;
	
	const nameParagraph = getFormParagraph('Book name:', name, 'Moby Dick');
	const authorParagraph = getFormParagraph('Book author:', author, 'Christian Bale');
	const publisherParagraph = getFormParagraph('Publisher:', publisher, 'Book space');
	const publisherAddressParagraph = getFormParagraph('Publisher address:', publisherAddress, 'Wall street, 81');
	const publisherTelParagraph = getFormParagraph('Publisher tel:', publisherTel, '+1234567890');
	const categoryParagraph = getFormParagraph('Book category:', category, 'Science');
	
	let imagesLinksNode = [];
	
	if (index !== 'new') {
		imagesLinks.forEach((link, index) => {
			imagesLinksNode.push(getFormParagraph(`Link number ${index + 1}`, link,null ,`link${index + 1}`));
		});
	} else {
		for (let index = 0; index < 3; index++) {
			imagesLinksNode.push(getFormParagraph(`Link number ${index + 1}`, '','Your link' ,`link${index + 1}`));
		}
	}
	
	const form = document.createElement('form');
	const section = document.createElement('section');
	section.className = 'editForm';
	
	// moved it here to improve performance
	//TODO return from getFormParagraph: paragraph and link to input
	const nameInput = nameParagraph.querySelector('input');
	const authorInput = authorParagraph.querySelector('input');
	const publisherInput = publisherParagraph.querySelector('input');
	const publisherAddressInput = publisherAddressParagraph.querySelector('input');
	const publisherTelInput = publisherTelParagraph.querySelector('input');
	const categoryInput = categoryParagraph.querySelector('input');
	
	const onConfirmClick = event => {
		const nameValues = nameInput.value;
		const authorValue = authorInput.value;
		const publisherValue = publisherInput.value;
		const publisherAddressValue = publisherAddressInput.value;
		const publisherTelValue = publisherTelInput.value;
		const categoryValue = categoryInput.value;
		
		// TODO обновлять галерею
		
		//just 3 elements
		const imageInput1 = form.querySelector('.link1')?.querySelector('input')?.value;
		const imageInput2 = form.querySelector('.link2')?.querySelector('input')?.value;
		const imageInput3 = form.querySelector('.link3')?.querySelector('input')?.value;
		
		const links = [imageInput1, imageInput2, imageInput3].filter(Boolean);
		const DEFAULT_IMAGE = ['https://i.picsum.photos/id/1055/250/300.jpg'];
		
		const updatedValues = transformToJSON(
			{
				name: nameValues, author: authorValue, publisher: publisherValue,
				publisherAddress: publisherAddressValue, publisherTel: publisherTelValue,
				category: categoryValue, imagesLinks: links.length > 0 ? links : DEFAULT_IMAGE
			});
		
		//setting new values
		if (index === 'new') {
			
			const newIndex = localStorage.getItem('booksAmount');
			localStorage.setItem(`book_${newIndex}`, updatedValues);
			localStorage.setItem('booksAmount', +newIndex + 1);
			
		} else {
			localStorage.setItem(`book_${index}`, updatedValues);
		}
		
		//to refresh paragraphs values
		deleteOldTextInfoValues && deleteOldTextInfoValues();
		deleteOldTextInfoValues && addBookInfoText();
		
		event.preventDefault();
		section.addEventListener('transitionend', hideEditForm);
		section.style.opacity = 0;
	};
	
	const confirmButton = CustomButton(buttonText, onConfirmClick);
	
	// TODO: move this code to utils
	const nodeElements = [
		nameParagraph, authorParagraph, publisherParagraph, publisherAddressParagraph,
		publisherTelParagraph, categoryParagraph
	];
	
	nodeElements.forEach(elem => form.appendChild(elem));
	imagesLinksNode.forEach(link => form.appendChild(link));
	form.appendChild(confirmButton);
	section.appendChild(form);
	return section;
};

export const getFormParagraph = (text, value, placeholder, className) => {
	const paragraph = document.createElement('p');
	const label = document.createElement('label');
	const input = document.createElement('input');
	
	paragraph.className = className;
	label.textContent = text;
	input.value = value || '';
	input.placeholder = placeholder || '';
	
	label.appendChild(input);
	paragraph.appendChild(label);
	
	return paragraph;
};

export default EditForm;
