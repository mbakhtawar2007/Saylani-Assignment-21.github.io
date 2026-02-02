class Stopwatch {
    constructor() {
        this.elapsedTime = 0;
        this.startTime = 0;
        this.pausedTime = 0;
        this.isRunning = false;
        this.intervalId = null;
        this.laps = [];

        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.millisecondsDisplay = document.getElementById('milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapList = document.getElementById('lapList');
        this.themeBtn = document.getElementById('themeBtn');

        this.init();
    }

    init() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());

        this.initializeTheme();
        this.updateDisplay();
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startTime = Date.now() - this.pausedTime;

        this.intervalId = setInterval(() => {
            this.update();
        }, 10);

        this.updateButtonStates();
    }

    pause() {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearInterval(this.intervalId);
        this.pausedTime = this.elapsedTime;

        this.updateButtonStates();
    }

    reset() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.elapsedTime = 0;
        this.startTime = 0;
        this.pausedTime = 0;
        this.laps = [];

        this.updateDisplay();
        this.updateButtonStates();
        this.renderLaps();
    }

    recordLap() {
        if (!this.isRunning) return;

        const lapTime = this.elapsedTime;
        this.laps.push(lapTime);
        this.renderLaps();
    }

    update() {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay();
    }

    updateDisplay() {
        const totalMilliseconds = this.elapsedTime;
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

        this.minutesDisplay.textContent = String(minutes).padStart(2, '0');
        this.secondsDisplay.textContent = String(seconds).padStart(2, '0');
        this.millisecondsDisplay.textContent = String(milliseconds).padStart(2, '0');
    }

    updateButtonStates() {
        if (this.isRunning) {
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.lapBtn.disabled = false;
        } else {
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.lapBtn.disabled = true;
        }
    }

    renderLaps() {
        this.lapList.innerHTML = '';

        if (this.laps.length === 0) return;

        const lapDifferences = [];
        for (let i = 0; i < this.laps.length; i++) {
            if (i === 0) {
                lapDifferences.push(this.laps[i]);
            } else {
                lapDifferences.push(this.laps[i] - this.laps[i - 1]);
            }
        }

        const fastestLapIndex = lapDifferences.indexOf(Math.min(...lapDifferences));
        const slowestLapIndex = lapDifferences.indexOf(Math.max(...lapDifferences));

        this.laps.forEach((lapTime, index) => {
            const lapDifference = lapDifferences[index];
            const lapItem = document.createElement('li');
            lapItem.className = 'lap-item';

            if (index === fastestLapIndex && this.laps.length > 1) {
                lapItem.style.borderLeftColor = '#28a745';
            } else if (index === slowestLapIndex && this.laps.length > 1) {
                lapItem.style.borderLeftColor = '#dc3545';
            }

            const lapNumber = document.createElement('span');
            lapNumber.className = 'lap-number';
            lapNumber.textContent = `Lap ${index + 1}`;

            const lapTimeFormatted = this.formatTime(lapDifference);
            const lapTimeSpan = document.createElement('span');
            lapTimeSpan.className = 'lap-time';
            lapTimeSpan.textContent = lapTimeFormatted;

            lapItem.appendChild(lapNumber);
            lapItem.appendChild(lapTimeSpan);
            this.lapList.appendChild(lapItem);
        });
    }

    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
    }

    toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        this.updateThemeIcon();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        this.themeBtn.querySelector('.theme-icon').textContent = isDarkMode ? '☀️' : '🌙';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});
