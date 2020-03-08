import './EditForm.css';
import {CustomButton} from "../CustomButton/CustomButton";
import {transformToJSON, transformFromJSON} from "../../utils";

const EditForm = (hideEditForm, deleteOldTextInfoValues, addBookInfoText, index, buttonText) => {

	
	const getValues = () => {
		return index === 'new'
				? {
					name: '', author: '', publisher: '', publisherAddress: '',
					publisherTel: '', category: '', imagesLinks: []
				  }
				: transformFromJSON(localStorage.getItem(`book_${index}`));
	};
	
	const {name, author, publisher, publisherAddress, publisherTel, category, imagesLinks} = getValues();
	
	const [nameParagraph, nameInput] = getFormParagraph('Book name:', name, 'Moby Dick');
	const [authorParagraph, authorInput] = getFormParagraph('Book author:', author, 'Christian Bale');
	const [publisherParagraph, publisherInput] = getFormParagraph('Publisher:', publisher, 'Book space');
	const [publisherAddressParagraph, publisherAddressInput] = getFormParagraph('Publisher address:', publisherAddress, 'Wall street, 81');
	const [publisherTelParagraph, publisherTelInput] = getFormParagraph('Publisher tel:', publisherTel, '+1234567890');
	const [categoryParagraph, categoryInput] = getFormParagraph('Book category:', category, 'Science');
	
	let imagesLinksNode = [];
	
	if (index !== 'new') {
		imagesLinks.forEach((link, index) => {
			const [paragraph] = getFormParagraph(`Link number ${index + 1}`, link,null ,`link${index + 1}`);
			imagesLinksNode.push(paragraph);
		});
	} else {
		for (let index = 0; index < 3; index++) {
			const [paragraph] = getFormParagraph(`Link number ${index + 1}`, '','Your link' ,`link${index + 1}`);
			imagesLinksNode.push(paragraph);
		}
	}
	
	const form = document.createElement('form');
	const section = document.createElement('section');
	section.className = 'editForm';
	
	const onConfirmClick = event => {
		const nameValues = nameInput.value;
		const authorValue = authorInput.value;
		const publisherValue = publisherInput.value;
		const publisherAddressValue = publisherAddressInput.value;
		const publisherTelValue = publisherTelInput.value;
		const categoryValue = categoryInput.value;
		
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
	
	return [paragraph, input];
};

export default EditForm;
