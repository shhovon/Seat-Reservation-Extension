function bookSeat() {
    const yesButton = document.querySelector("button[class='btn btn-primary']");
    if (yesButton) {
        yesButton.click();
        console.log("Seat successfully booked!");
    } else {
        console.log("Yes button not found.");
    }
}

function scheduleBooking(timeInput) {
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '10px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.padding = '10px';
    messageDiv.style.backgroundColor = '#f0f0f0';
    messageDiv.style.border = '1px solid #ccc';
    messageDiv.style.zIndex = '9999';
    messageDiv.style.width = '250px';
    messageDiv.style.textAlign = 'center';
    document.body.appendChild(messageDiv);

    const yesButton = document.querySelector("button[class='btn btn-primary']");

    if (!yesButton) {
        messageDiv.textContent = "Please select a seat and click the save button.";
        messageDiv.style.color = "red";
        return;
    }

    const now = new Date();
    const targetTime = new Date();
    const [hours, minutes] = timeInput.split(":").map(Number);
    targetTime.setHours(hours, minutes, 0, 0);

    const delay = targetTime - now;

    function bookSeat() {
        const yesButton = document.querySelector("button[class='btn btn-primary']");
        if (yesButton) {
            yesButton.click();
            messageDiv.textContent = "Seat successfully booked!";
            messageDiv.style.color = "green";
        } else {
            messageDiv.textContent = "Yes button not found.";
            messageDiv.style.color = "red";
        }
    }

    if (delay > 0) {
        let countdownInterval = setInterval(() => {
            const currentTime = new Date();
            const secondsRemaining = Math.round((targetTime - currentTime) / 1000);

            if (secondsRemaining <= 0) {
                clearInterval(countdownInterval);
            } else {
                messageDiv.textContent = `Seat will be auto reserved in ${secondsRemaining} seconds`;
                messageDiv.style.color = "blue";
            }
        }, 1000);

        setTimeout(bookSeat, delay);
    } else {
        messageDiv.textContent = "Invalid time selected.";
        messageDiv.style.color = "red";
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.checkButton) {
        const yesButton = document.querySelector("button[class='btn btn-primary']");
        if (yesButton) {
            sendResponse({ buttonFound: true });
        } else {
            sendResponse({ buttonFound: false });
        }
    }

    if (request.time) {
        scheduleBooking(request.time);
        sendResponse({ success: true });
    }
});
