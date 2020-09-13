import { SubmissionAPIResponse } from '../../types/types';
import { StatusConstants } from '../../constants/statusConstants';

export class SubmissionData {
    public name: string;
    public email: string;
    public phone: string;
    public dateOfBirth: string;
    //public ticketType: string;
    public transactionImage: File;
    public busWaiver: File; 

    /**
    * The constructor:
    * @param {Element} name - The name field to validate and send.
    * @param {Element} email - The email field to validate and send.
    * @param {Element} phone - The phone field to validate and send.
    * @param {Element} dateOfBirth - The date of birth field to validate and send.
    * @param {Element} ticketType - The type of ticket field to validate and send.
    * @param {Element} transactionImage - The transaction image field to validate and send.
    * @param {Element} busWavier - The bus wavier field to validate and send.
    */
    constructor(
        name: string, email: string, phone: string, dateOfBirth: string, transactionImage: File, busWaiver:File
    ) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        //this.ticketType = ticketType;
        this.transactionImage = transactionImage;
        this.busWaiver = busWaiver;
    }

    /**
     * Sends data to submit the ad. 
     */
    public async sendData() {
        const submissionFormData = new FormData();

        submissionFormData.append('nameText', this.name);
        submissionFormData.append('emailText', this.email);
        submissionFormData.append('phoneText', this.phone);
        submissionFormData.append('dateOfBirthText', this.dateOfBirth);
        //submissionFormData.append('ticketTypeNumber', this.ticketType);
        submissionFormData.append('transactionFile', this.transactionImage);
        submissionFormData.append('busWaiverFile', this.busWaiver);

        const response = await fetch('../api/send_submission.php', {
            method: 'POST',
            body: submissionFormData
        });

        const data: SubmissionAPIResponse = await response.json();

        if (data.status === StatusConstants.ERROR) {
            throw new Error(data.message);
        }
    }
}