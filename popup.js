document.addEventListener("DOMContentLoaded", () => {
    const startBookingButton = document.getElementById("startBooking");
    const timeInput = document.getElementById("timeInput");
    const messageDiv = document.getElementById("messageDiv");

    if (timeInput) {
        timeInput.value = "16:30";
    }

    startBookingButton.addEventListener("click", () => {
        const selectedTime = timeInput.value;
        if (!selectedTime) {
            messageDiv.textContent = "Please select a time.";
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];

            if (!currentTab.url.startsWith("https://transport.pacificjeans.com")) {
                messageDiv.textContent = "This extension can only be used on transport.pacificjeans.com";
				messageDiv.style.color = "red";
                return;
            }

            chrome.tabs.sendMessage(currentTab.id, { checkButton: true }, (response) => {
                if (response && response.buttonFound) {
                    messageDiv.textContent = "Seat selected and booking in progress...";
                    messageDiv.style.color = "blue";

                    chrome.tabs.sendMessage(currentTab.id, { time: selectedTime }, (response) => {
                        if (response && response.success) {
                            messageDiv.textContent = "Seat successfully selected!";
                            messageDiv.style.color = "green";
                        } else {
                            messageDiv.textContent = response ? response.error : "Error during booking.";
                            messageDiv.style.color = "red";
                        }
                    });
                } else {
                    messageDiv.textContent = "Please select a seat and click the save button.";
                    messageDiv.style.color = "red";
                }
            });
        });
    });
});
