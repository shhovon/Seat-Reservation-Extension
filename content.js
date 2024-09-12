chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.time) {
        scheduleBooking(request.time);
    }
});

function scheduleBooking(timeInput) {
    const messageDiv = document.createElement('div');
	
	// Set styles to center the message on the page
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20%';
    messageDiv.style.left = '55%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.padding = '20px';
    messageDiv.style.backgroundColor = '#f0f0f0';
    messageDiv.style.border = '1px solid #ccc';
    messageDiv.style.borderRadius = '8px'; 
    messageDiv.style.textAlign = 'center'; 
    messageDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    document.body.appendChild(messageDiv);

    // check if yes button found
    const yesButton = document.querySelector("button[class='btn btn-primary']");

    if (!yesButton) {
        messageDiv.textContent = "Select a seat and click the save button";
        messageDiv.style.color = "red";
        return; 
    }

    // if seat selected
    const now = new Date();
    const targetTime = new Date();

    const [hours, minutes] = timeInput.split(":").map(Number);
    targetTime.setHours(hours, minutes, 0, 0);

    const delay = targetTime - now;

    if (delay > 0) {

        messageDiv.textContent = `Booking will start in ${Math.round(delay / 1000)} seconds.`;
        messageDiv.style.color = "blue";

        // automatically click yes button
        setTimeout(() => {
            const yesButton = document.querySelector("button[class='btn btn-primary']");
            if (yesButton) {
                yesButton.click();
                messageDiv.textContent = "Seat successfully booked!";
                messageDiv.style.color = "green";
            } else {
                messageDiv.textContent = "Yes button not found";
                messageDiv.style.color = "red";
            }
        }, delay);
    } else {

        messageDiv.textContent = "Invalid time selected";
        messageDiv.style.color = "red";
    }
}

