document.addEventListener("DOMContentLoaded", function() {
    const timeInput = document.getElementById("time");
    const startBookingButton = document.getElementById("startBooking");
    
    // default time 4:30 pm
    timeInput.value = "16:30";

    // check if user is on the correct url
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const urlPattern = "https://transport.pacificjeans.com/*";

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
        const selectedTime = timeInput.value;
        console.log("Selected time for booking: ", selectedTime);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { time: selectedTime });
        });
    });
});

function displayMessage(message, color) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.style.color = color;

    // debugging
    console.log(`Message displayed: ${message}, Color: ${color}`);
}
