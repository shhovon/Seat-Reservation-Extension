chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.time) {
        const now = new Date();
        const targetTime = new Date();
        
        // Split the time sent by the user and set it
        const [hours, minutes] = request.time.split(":").map(Number);
        targetTime.setHours(hours, minutes, 0, 0);

        const delay = targetTime - now;

        if (delay > 0) {
            // Schedule the seat booking
            setTimeout(() => {
                const yesButton = document.querySelector("button[class='btn btn-primary']");
                if (yesButton) {
                    yesButton.click();
                    sendResponse({ success: true });
                } else {
                    sendResponse({ success: false, error: "Seat not selected or save button not found." });
                }
            }, delay);
        } else {
            sendResponse({ success: false, error: "Invalid time selected." });
        }
    }

    // Return true to indicate that the response will be sent asynchronously
    return true;
});
