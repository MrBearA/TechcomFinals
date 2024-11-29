// Add this function at the top of your JavaScript file
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Remove the notification after animation ends
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Shepherd tour
    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'shepherd-theme-custom',
            scrollTo: true,
            modalOverlayOpeningPadding: 4,
            modalOverlayOpeningRadius: 4,
            useModalOverlay: true
        }
    });

    // Add steps to the tour
    tour.addStep({
        id: 'audio-only-intro',
        title: 'Audio Only Mode',
        text: 'Slow internet? No worries! Audio Only mode turns off your video but keeps your voice connected. Perfect for weak Wi-Fi!',
        attachTo: {
            element: '.audio-only-btn',
            on: 'top'
        },
        buttons: [
            {
                text: 'Next',
                action: () => {
                    const videoSettingsBtn = document.querySelector('.menu-item:last-child');
                    videoSettingsBtn.click();
                    const bandwidthTab = document.querySelector('.sidebar-item:nth-child(6)');
                    bandwidthTab.click();
                    tour.next();
                }
            }
        ]
    });

    tour.addStep({
        id: 'bandwidth-options',
        title: 'Connection Settings',
        text: 'Pick what works best for your internet:',
        attachTo: {
            element: '.bandwidth-options',
            on: 'right'
        },
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        id: 'high-bandwidth',
        title: 'High Quality',
        text: 'Got fast internet? Choose this for the best video and sound quality!',
        attachTo: {
            element: '.bandwidth-option:first-child',
            on: 'right'
        },
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        id: 'balanced-bandwidth',
        title: 'Regular Mode',
        text: 'Works great for most people - gives you good quality without using too much internet',
        attachTo: {
            element: '.bandwidth-option:nth-child(2)',
            on: 'right'
        },
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        id: 'low-bandwidth',
        title: 'Low Data Mode',
        text: 'Internet acting up? This mode keeps you connected with just audio - great for saving data too!',
        attachTo: {
            element: '.bandwidth-option:last-child',
            on: 'right'
        },
        buttons: [
            {
                text: 'Next',
                action: () => {
                    const lowLatencyTab = document.querySelector('.sidebar-item:nth-child(7)');
                    lowLatencyTab.click();
                    tour.next();
                }
            }
        ]
    });

    tour.addStep({
        id: 'low-latency-frame',
        title: 'Low-Latency Frame Mode',
        text: 'Having video issues? This smart feature freezes your video instead of showing laggy frames. It keeps a clear image while maintaining perfect audio - great for presentations or when your connection is unstable!',
        attachTo: {
            element: '.low-latency-content',
            on: 'right'
        },
        buttons: [
            {
                text: 'Done',
                action: tour.complete
            }
        ]
    });

    // Video button functionality
    const videoBtn = document.querySelector('.video-btn');
    const videoMenu = document.getElementById('videoMenu');
    
    if (videoBtn && videoMenu) {
        videoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle menu visibility
            if (videoMenu.style.display === 'block') {
                videoMenu.style.display = 'none';
            } else {
                videoMenu.style.display = 'block';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!videoBtn.contains(e.target) && !videoMenu.contains(e.target)) {
                videoMenu.style.display = 'none';
            }
        });

        // Handle menu item clicks
        const menuItems = videoMenu.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                // Add your menu item click handling here
                videoMenu.style.display = 'none';
            });
        });
    }

    // Keep existing audio button functionality
    const joinAudioBtn = document.querySelector('.control-btn');
    if (joinAudioBtn) {
        joinAudioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = joinAudioBtn.querySelector('i');
            const text = joinAudioBtn.querySelector('span');
            
            if (icon.classList.contains('fa-microphone')) {
                icon.classList.replace('fa-microphone', 'fa-microphone-slash');
                text.textContent = 'Mute';
            } else {
                icon.classList.replace('fa-microphone-slash', 'fa-microphone');
                text.textContent = 'Join Audio';
            }
        });
    }

    // Special handling for end button
    const endBtn = document.querySelector('.end-btn');
    if (endBtn) {
        endBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to end the call?')) {
                window.location.href = '../index.html';
            }
        });
    }

    // Announcement close functionality
    const announcement = document.querySelector('.announcement');
    const closeBtn = document.querySelector('.announcement-close');
    
    if (closeBtn && announcement) {
        closeBtn.addEventListener('click', () => {
            announcement.style.display = 'none';
            tour.start();
        });
    }

    const videoSettingsBtn = document.querySelector('.menu-item:last-child');
    const settingsModal = document.getElementById('videoSettingsModal');
    const closeSettingsBtn = settingsModal.querySelector('.close-btn');
    const sidebarItems = settingsModal.querySelectorAll('.sidebar-item');
    const generalContent = document.querySelector('.settings-body > div:not(.bandwidth-content)');
    const bandwidthContent = document.querySelector('.bandwidth-content');

    videoSettingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Hide all panels first
            const allPanels = document.querySelectorAll('.settings-panel, .bandwidth-content, .low-latency-content');
            allPanels.forEach(panel => panel.style.display = 'none');

            const itemText = item.querySelector('span').textContent;
            
            // Show appropriate panel
            switch(itemText) {
                case 'General':
                    document.querySelector('.settings-body').style.display = 'block';
                    break;
                case 'Bandwidth Control':
                    document.querySelector('.bandwidth-content').style.display = 'block';
                    break;
                case 'Low-Latency Frame':
                    // Only create low latency content if it doesn't exist
                    let lowLatencyPanel = document.querySelector('.low-latency-content');
                    if (!lowLatencyPanel) {
                        const lowLatencyContent = `
                            <div class="low-latency-content settings-panel">
                                <h3>Low-Latency Frame Mode</h3>
                                <div class="setting-section">
                                    <label class="setting-checkbox-label">
                                        <input type="checkbox" id="freezeFrame">
                                        <span>Enable Frame Freezing</span>
                                    </label>
                                    <small class="setting-description">
                                        Freezing: Instead of dropping frames when bandwidth is low, the system could freeze the video
                                        stream temporarily, showing a clear static image (instead of a pixelated or lagging video) while maintaining stable audio
                                        connection. The frozen frame would hold until the connection improves.
                                    </small>
                                </div>
                            </div>`;
                        document.querySelector('.settings-content').insertAdjacentHTML('beforeend', lowLatencyContent);
                    }
                    document.querySelector('.low-latency-content').style.display = 'block';
                    break;
            }
        });
    });

    // Close modal when clicking outside
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // Find the existing audio-only button click handler and modify it
    const audioOnlyBtn = document.querySelector('.audio-only-btn');
    if (audioOnlyBtn) {
        audioOnlyBtn.addEventListener('click', () => {
            showNotification('Audio Only Mode');
            // Add any other audio-only functionality here
        });
    }
});
