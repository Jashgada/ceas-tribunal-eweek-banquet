import { SubmissionData } from './models/submissionRequests';
import { validateInputFieldData, displayWarning} from './common/uiElements';
import { FileConstants } from '../constants/fileConstants';

export const submitData = function(){

    const submitButton = document.querySelector('form #submit-button') as HTMLButtonElement;

    const loader = document.querySelector('.loader') as HTMLDivElement;

    const fileSizeLimit = FileConstants.FILE_SIZE_LIMIT_MB * 1024 * 1024;

    submitButton.onclick = (async() => {
        const name = document.querySelector('form #name') as HTMLInputElement;
        const email = document.querySelector('form #email') as HTMLInputElement;
        const phoneNumber = document.querySelector('form #phone-number') as HTMLInputElement;
        const birthDate = document.querySelector('form #birth-date') as HTMLInputElement;
        const ticketType = getSelectedTicketType(); // document.getElementsByName('ticket_type')
        const venmo = document.querySelector('form #venmo-image') as HTMLInputElement;
        const waiver = document.querySelector('form #bus-waiver') as HTMLInputElement;

        if(!validateInputFieldData(name, email, phoneNumber, birthDate) && venmo.files !== null && venmo.files.length > 0 && waiver.files!==null && waiver.files.length>0){
            // Add file checking
            submitButton.style.display = 'none';
            loader.style.display = 'block';

            if ((waiver.files[0] && waiver.files[0].size > fileSizeLimit) || (venmo.files[0] && venmo.files[0].size>fileSizeLimit)) {
                displayWarning('Please choose a file under 2MB.');
                submitButton.style.display = 'block';
                loader.style.display = 'none';
            } else {
                const submissionData = new SubmissionData(name.value, email.value, phoneNumber.value, birthDate.value, ticketType, venmo.files[0], waiver.files[0]);

                try {
                    await submissionData.sendData();
    
                    const introInfo = document.querySelector('.intro-info') as HTMLDivElement;
                    const submissionForm = document.querySelector('form') as HTMLFormElement;
                    // const submissionConfirm = document.querySelector('.submission-confirm') as HTMLDivElement;
        
                    introInfo.style.display = 'none';
                    submissionForm.style.display = 'none';
                   // submissionConfirm.style.display = 'block';
                } catch (e) {
                    displayWarning(e);
                    submitButton.style.display = 'block';
                    loader.style.display = 'none';
                }
            }
        } else {
            displayWarning('Please complete all fields.')
        }
    });
};

export const watchFileUploadText = function () {
    const fileUploadElement = document.querySelector('#venmo-image') as HTMLInputElement;
    const fileUploadText = document.querySelector('.file-text-venmo span') as HTMLSpanElement;

    const fileUploadElement2 = document.querySelector('#bus-waiver') as HTMLInputElement;
    const fileUploadText2 = document.querySelector('.file-text-waiver-span') as HTMLSpanElement;

    fileUploadElement.onchange = function () {
        if (fileUploadElement.files !== null) {
            const fileName = fileUploadElement.files[0].name;
            fileUploadText.textContent = fileName;
        }
    };

    fileUploadElement2.onchange = function () {
        if (fileUploadElement2.files !== null) {
            const fileName = fileUploadElement2.files[0].name;
            fileUploadText2.textContent = fileName;
        }
    };
}

const getSelectedTicketType = function() : string{
    //const ticket_type = document.getElementsByName('ticket_type');
   const form = document.forms[0];
console.log(form);
//const radios = form.elements[4];
const radios = form.elements.namedItem("ticket_type") as RadioNodeList;
console.log(radios.value);


//   let checkedNum;
//    console.log(ticket_type);
//    ticket_type.forEach(ticket => {
//         if(ticket.checked)
//         {return ticket.value;}
//  })
    return radios.value;

}

export const watchInputText = function(){

    const phoneNumber = document.querySelector('form #phone-number') as HTMLInputElement;
    const birthDate = document.querySelector('form #birth-date') as HTMLInputElement;

    phoneNumber.onkeyup = function(ev)
    {
        if ((phoneNumber.value.length === 3 || phoneNumber.value.length === 7) && phoneNumber.value !== '' && ev.key !== 'Backspace') {
            phoneNumber.value += '-';
  }
}

    birthDate.onkeyup = function(ev)
    {
        if ((birthDate.value.length === 2 || birthDate.value.length === 5) && birthDate.value !== '' && ev.key !== 'Backspace') {
            birthDate.value += '/';
  }
    }

}