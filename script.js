// Select elements
const playVideoButton = document.getElementById("playVideoButton");
const videoModal = document.getElementById("videoModal");
const closeModalButton = document.querySelector(".close");
const videoElement = videoModal.querySelector("video");

// Select settings elements
const moreButton = document.querySelector(".bottom-nav .nav-item:last-child");
const settingsForm = document.getElementById("settingsForm");
const closeSettingsButton = settingsForm.querySelector(".close-settings");

// Select the new meeting button and meeting form elements
const newMeetingButton = document.querySelector(".new-meeting");
const meetingForm = document.getElementById("meetingForm");
const closeMeetingButton = meetingForm.querySelector(".close-meeting");

// Beginner Mode Toggle
const beginnerModeToggle = document.getElementById("beginnerModeToggle");
let isBeginnerMode = true;

// Open video modal
playVideoButton.onclick = function() {
    videoModal.style.display = "flex";
    videoModal.classList.add("fade-in");
    videoElement.play(); // Play video
};

// Close video modal
closeModalButton.onclick = function() {
    videoModal.classList.remove("fade-in");
    videoModal.classList.add("fade-out");

    setTimeout(() => {
        videoModal.style.display = "none";
        videoModal.classList.remove("fade-out");
        videoElement.pause();
        videoElement.currentTime = 0; // Reset video
    }, 300); // Duration matches CSS animation
};

// Close modal on outside click
window.onclick = function(event) {
    if (event.target == videoModal) {
        closeModalButton.onclick();
    } else if (event.target == settingsForm) {
        closeSettingsButton.onclick();
    } else if (event.target == meetingForm) {
        closeMeetingButton.onclick();
    }
};

// Open settings form on 'More' button click
moreButton.onclick = function() {
    settingsForm.style.display = "flex";
};

// Close settings form
closeSettingsButton.onclick = function() {
    settingsForm.style.display = "none";
};

// Open meeting form modal on 'New Meeting' button click
newMeetingButton.onclick = function() {
    meetingForm.style.display = "flex";
};

// Close meeting form modal
closeMeetingButton.onclick = function() {
    meetingForm.style.display = "none";
};

// Add form submission handler
const meetingFormElement = meetingForm.querySelector("form");
meetingFormElement.onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form values if needed
    const meetingName = document.getElementById("meetingName").value;
    const meetingPassword = document.getElementById("meetingPassword").value;
    
    // Close the meeting form
    meetingForm.style.display = "none";
    
    // Open call.html in the same window
    window.location.href = "incall/call.html";
};

beginnerModeToggle.onclick = () => {
    isBeginnerMode = !isBeginnerMode;

    // Toggle visibility of advanced features
    document.querySelectorAll(".beginner-hide").forEach(element => {
        element.style.display = isBeginnerMode ? "none" : "block";
    });

    // Update button text
    beginnerModeToggle.textContent = `Beginner Mode: ${isBeginnerMode ? "ON" : "OFF"}`;
};

// Initialize Beginner Mode
document.addEventListener("DOMContentLoaded", () => {
    beginnerModeToggle.onclick(); // Apply initial mode settings
});

// Add this new code at the end of your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Get the demo button
    const demoButton = document.getElementById('demoButton');
    
    // Add click event for demo button
    demoButton?.addEventListener('click', function() {
        const videoFrame = document.getElementById('videoFrame');
        videoFrame.src = this.getAttribute('data-video');
        videoModal.style.display = "flex";
        videoModal.classList.add("fade-in");
    });

    // Update the existing playVideoButton click handler
    const existingPlayButton = document.getElementById('playVideoButton');
    existingPlayButton?.addEventListener('click', function() {
        const videoFrame = document.getElementById('videoFrame');
        videoFrame.src = this.getAttribute('data-video');
        videoModal.style.display = "flex";
        videoModal.classList.add("fade-in");
    });
});
