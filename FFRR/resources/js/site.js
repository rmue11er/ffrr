import moment from "moment";

window.addEventListener("DOMContentLoaded",() => {
    const uec = new UnixEpochalypseCountdown(".cd");
});

class UnixEpochalypseCountdown {
    constructor(qs) {
        this.el = document.querySelector(qs);
        this.time = [];
        this.animTimeout = null;
        this.updateTimeout = null;
        this.update();
    }
    getTimeLeft() {
        let timeLeft = {
            d: 0,
            h: 0,
            m: 0,
        };

        if (typeof moment === "function") {
            const later = moment('2025-02-01');
            const now = moment();
            const diff = moment.duration(later.diff(now));

            if (diff.valueOf() >= 0) {
                timeLeft.d += diff.days() + (diff.months() * 31);
                timeLeft.h += diff.hours();
                timeLeft.m += diff.minutes();
            }
        }

        return timeLeft;
    }
    clearAnimations() {
        if (this.el) {
            const colAnimsToClear = this.el.querySelectorAll("[data-col]");

            Array.from(colAnimsToClear).forEach(a => {
                a.classList.remove("cd__digit--roll-in");
            });

            const posAnimsToClear = this.el.querySelectorAll("[data-pos]");

            Array.from(posAnimsToClear).forEach(a => {
                a.classList.remove("cd__next-digit-fade","cd__prev-digit-fade");
            });
        }
    }
    update(doAnimations = false) {
        // start with all dashes
        if (!this.time.length) {
            let digitCount = 6;

            while (digitCount--)
                this.time.push("-");
        }
        // update data
        const display = this.getTimeLeft();
        const displayDigits = [];

        for (let v in display) {
            const digits = `${display[v]}`.split("");
            // add zero to single digits
            if (digits.length < 2)
                digits.unshift("0");

            displayDigits.push(...digits);
        }
        // update display
        const cols = this.el.querySelectorAll("[data-col]");

        if (cols) {
            Array.from(cols).forEach((c,i) => {
                const digit = displayDigits[i];

                if (digit !== this.time[i]) {
                    const next = c.querySelector(`[data-pos="next"]`);
                    const prev = c.querySelector(`[data-pos="prev"]`);

                    if (doAnimations === true) {
                        c.classList.add("cd__digit--roll-in");
                        next.classList.add("cd__next-digit-fade");
                        prev.classList.add("cd__prev-digit-fade");
                    }

                    next.innerHTML = digit;
                    prev.innerHTML = this.time[i];
                }
            });
        }

        this.time = displayDigits;

        // loop
        clearTimeout(this.animTimeout);
        this.animTimeout = setTimeout(this.clearAnimations.bind(this),500);

        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(this.update.bind(this,true),1e3);
    }
}
