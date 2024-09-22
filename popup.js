document.addEventListener("DOMContentLoaded", () => {
    const startBookingButton = document.getElementById("startBooking");
    const timeInput = document.getElementById("timeInput");
    const messageDiv = document.getElementById("messageDiv");

    if (timeInput) {
        // Set default time to 4:30 PM
        timeInput.value = "16:30";
    }

    startBookingButton.addEventListener("click", () => {
        const selectedTime = timeInput.value;
        if (!selectedTime) {
            messageDiv.textContent = "Please select a time.";
            return;
        }

        // Get the current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];

            if (!currentTab.url.startsWith("https://transport.pacificjeans.com")) {
                messageDiv.textContent = "This extension can only be used on transport.pacificjeans.com";
                return;
            }

            // Send selected time to content.js for booking
            chrome.tabs.sendMessage(currentTab.id, { time: selectedTime }, (response) => {
                if (response && response.success) {
                    messageDiv.textContent = "Booking will start at the selected time.";
                } else {
                    messageDiv.textContent = response ? response.error : "Error during booking.";
                }
            });
        });
    });
});
