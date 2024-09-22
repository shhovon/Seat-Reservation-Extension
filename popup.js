document.addEventListener("DOMContentLoaded", () => {
    const startBookingButton = document.getElementById("startBooking");
    const timeInput = document.getElementById("timeInput");
    const messageDiv = document.getElementById("messageDiv");

    if (timeInput) {
        // Set default time to 4:30 PM
        timeInput.value = "16:30";
    }

<<<<<<< HEAD
    startBookingButton.addEventListener("click", () => {
=======
        if (!currentTab.url.startsWith("https://transport.pacificjeans.com")) {
            displayMessage("This extension can only be used on transport.pacificjeans.com", "red");

            // Disable the "Start Booking" button
            startBookingButton.disabled = true;
            startBookingButton.style.backgroundColor = "#ccc";
            startBookingButton.style.cursor = "not-allowed";
        } else {
            // Enable the button if the URL is correct
            startBookingButton.disabled = false;
            startBookingButton.style.backgroundColor = "#007bff";
            startBookingButton.style.cursor = "pointer";
        }
    });

    document.getElementById("startBooking").addEventListener("click", () => {
        console.log("Start Booking button clicked!");

        const now = new Date();
        const bookingStartTime = new Date();
        bookingStartTime.setHours(16, 15, 0, 0); // pool creation
        const bookingStartExactTime = new Date();
        bookingStartExactTime.setHours(16, 30, 0, 0); // booking time 4:30 pm

        // debugging
        console.log("Current time: ", now);
        console.log("Booking can start selecting seats at: 4:15 PM");
        console.log("Booking will start exactly at: 4:30 PM");

        if (now < bookingStartTime) {
            displayMessage("Booking has not started yet. Wait until pool is created", "red");
            return;
        }

        if (now < bookingStartExactTime) {
            const remainingSeconds = Math.floor((bookingStartExactTime - now) / 1000);
            displayMessage(`Booking will start in ${remainingSeconds} seconds.`, "blue");
            return;
        }

        // send the selected time to content.js
>>>>>>> ed32af1a082474029d54b20ead805e72ebd26e23
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
