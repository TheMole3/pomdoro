let timerDuration = 25 * 60; // Default Pomodoro duration in seconds
let timeLeft = timerDuration;
let timer;

self.onmessage = function(event) {
    switch (event.data.type) {
        case 'START':
            timerDuration = event.data.duration;
            timeLeft = timerDuration;
            clearInterval(timer);
            timer = setInterval(function() {
                if (timeLeft > 0) {
                    timeLeft--;
                    self.postMessage({ type: 'TICK', timeLeft: timeLeft });
                } else {
                    clearInterval(timer);
                    self.postMessage({ type: 'END' });
                }
            }, 1000);
            break;
        case 'RESET':
            clearInterval(timer);
            timeLeft = timerDuration;
            self.postMessage({ type: 'RESET', timeLeft: timeLeft });
            break;
        case 'STOP':
            clearInterval(timer);
            break;
    }
};

// Notification and Sound
self.addEventListener('message', function(event) {
    if (event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification(event.data.title, {
            body: event.data.body,
            icon: event.data.icon
        });
    }
});
