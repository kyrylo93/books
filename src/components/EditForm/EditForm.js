import './EditForm.css';
import {CustomButton} from "../CustomButton/CustomButton";
import {transformToJSON} from "../../utils";

const EditForm = (props, hideEditForm, deleteOldTextInfoValues, addBookInfoText, index) => {
	
	// TODO : do i need imagesLinks here?
	const {name, author, publisher, publisherAddress, publisherTel, category, imagesLinks} = props;
	
	const nameParagraph = getFormParagraph('Book name:', name, 'Moby Dick');
	const authorParagraph = getFormParagraph('Book author:', author, 'Christian Bale');
	const publisherParagraph = getFormParagraph('Publisher:', publisher, 'Book space');
	const publisherAddressParagraph = getFormParagraph('Publisher address:', publisherAddress, 'Wall street, 81');
	const publisherTelParagraph = getFormParagraph('Publisher tel:', publisherTel, '+1234567890');
	const categoryParagraph = getFormParagraph('Book category:', category, 'Science');
	
	const form = document.createElement('form');
	const section = document.createElement('section');
	section.className = 'editForm';
	
	// moved it here to improve performance
	//TODO return from getFormParagraph paragraph and link to input
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
		
		const updatedValues = transformToJSON(
			{
				name: nameValues, author: authorValue, publisher: publisherValue,
				publisherAddress: publisherAddressValue, publisherTel: publisherTelValue,
				category: categoryValue, imagesLinks: imagesLinks
			});
		
		//setting new values
		localStorage.setItem(`book_${index}`, updatedValues);
		
		//to refresh paragraphs values
		deleteOldTextInfoValues();
		addBookInfoText();
		
		event.preventDefault();
		section.addEventListener('transitionend', hideEditForm);
		section.style.opacity = 0;
	};
	
	const confirmButton = CustomButton('Confirm changes', onConfirmClick);
	
	// TODO: move this code to utils
	const nodeElements = [
		nameParagraph, authorParagraph, publisherParagraph, publisherAddressParagraph,
		publisherTelParagraph, categoryParagraph, confirmButton
	];
	
	nodeElements.forEach(elem => form.appendChild(elem));
	section.appendChild(form);
	return section;
};

export const getFormParagraph = (text, value, placeholder) => {
	const paragraph = document.createElement('p');
	const label = document.createElement('label');
	const input = document.createElement('input');
	
	label.textContent = text;
	input.value = value || '';
	
	input.placeholder = placeholder;
	
	label.appendChild(input);
	paragraph.appendChild(label);
	
	return paragraph;
};

export default EditForm;
