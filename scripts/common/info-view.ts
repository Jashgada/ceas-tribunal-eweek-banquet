import {displayWarning} from './uiElements'

// /**
//  * Displays information about the Venmo transaction and generates the Venmo deep link.
//  * @param {int} price - The price of the ticket to display.
//  * @param {string} venmoRecipient - The reciepient of the venmo transaction to display.
//  */
// const generateVenmoInfo = function generateVenmoInfoForView(price:number, venmoRecipient:string) {
//     const venmoLinkButton = document.querySelector('.open-venmo') as HTMLButtonElement;
//     const venmoLinkPath = `venmo://paycharge?txn=pay&recipients=${venmoRecipient}&note=Eweek Banquet`;
  
//     venmoLinkButton.onclick = function openVenmoOnClick() {
//       if (/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
//         window.open(venmoLinkPath, '_blank');
//       } else {
//         window.open('https://venmo.com', '_blank');
//       }
//     };
  
//     const DOMTicketPrice = document.querySelector('.ticket-price');
//     const DOMVenmoRecipient = document.querySelector('.venmo-recipient');
  
//     DOMTicketPrice.textContent = price;
//     DOMVenmoRecipient.textContent = venmoRecipient;
//   };
  
 /**
   * Displays various information about the event details in the form.
   * @param {string} description - The description of the event to display.
   * @param {int} price - The price of the ticket to display.
   * @param {string} venmoRecipient - The reciepient of the venmo transaction to display.
   */
  const displayInfo = function displayInfoForView(description:string, venmoRecipient:string) {
    // console.log(isLuauOpen);
    // if (isLuauOpen) {
    //   const luauForm = document.querySelector('.luau-form');
    //   luauForm.style.display = 'block';
    // } else {
    //   const luauClosed = document.querySelector('.luau-closed');
    //   luauClosed.style.display = 'block';
    // }
    const descriptionDiv = document.querySelector('.intro-info') as HTMLElement;
    descriptionDiv.textContent = description;
  
    // generateVenmoInfo(price, venmoRecipient);
  };

  const displayTicketPrice = function displayTicketInfoForView(tickets:any[]){
    const ticket1Price0 = document.querySelector(".radio-0") as HTMLElement;
    ticket1Price0.textContent =tickets[1].name + " ($" + tickets[1].price.toString() + ")";
   const ticket1Price1 = document.querySelector(".radio-1") as HTMLElement;
   ticket1Price1.textContent =tickets[2].name + " ($" +  tickets[2].price.toString() + ")";
   const ticket1Price2 = document.querySelector(".radio-2") as HTMLElement;
   ticket1Price2.textContent =tickets[3].name + " ($" +  tickets[3].price.toString() + ")";
  }
  

async function fetchInfo(){
  const response = await fetch('../api/get_info.php', {
    method:'GET'
  });
  const data = await response.json();
  if(data.status = "success"){
    const mostRecentData = data.data[data.data.length - 1];
          displayInfo(
            mostRecentData.description,
            mostRecentData.venmo_recipient,
            // mostRecentData.venmo_recipient,
            // Boolean(Number(mostRecentData.luau_open)),
          );
  }
  else{
    displayWarning('Something went wrong while retrieving information. Please refresh the page. If the error persists, check your network connection.');
  }
}

async function fetchTicketInfo() {
  const response = await fetch('../api/get_ticket_info.php', {
    method:'GET'
  });

  const data = await response.json();
  if(response.ok){
    const mostRecentData = data.data;
          displayTicketPrice(
            mostRecentData,
            // mostRecentData.venmo_recipient,
            // Boolean(Number(mostRecentData.luau_open)),
          );
  }
  else{
    displayWarning('Something went wrong while retrieving information. Please refresh the page. If the error persists, check your network connection.');
  }

  
}

  /**
   * Gets info about the event to display in the form.
   * @exports
   */
  export const getInfo = function() {
    fetchInfo();
    fetchTicketInfo();
  }