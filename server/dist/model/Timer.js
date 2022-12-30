"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(time, increment) {
        this.timeLeft = time;
        this.increment = increment;
        this.startTime = null;
        this.stopTime = null;
    }
    start() {
        this.startTime = Date.now();
    }
    stop(delay = 0, color) {
        if (this.startTime == null)
            return;
        this.stopTime = Date.now();
        this.timeLeft -= this.stopTime - this.startTime;
        this.timeLeft += this.increment + delay;
        console.log(`Added first delay ${delay} to ${color} time`);
    }
    tick() {
        if (this.startTime == null)
            return;
        this.timeLeft -= Date.now() - this.startTime;
        this.startTime = Date.now();
    }
    timeout() {
        return this.timeLeft <= 0;
    }
    addTime(time, color) {
        if (this.startTime == null)
            return;
        this.timeLeft += time;
        console.log(`Added second delay ${time} to ${color} time`);
    }
}
exports.default = Timer;
