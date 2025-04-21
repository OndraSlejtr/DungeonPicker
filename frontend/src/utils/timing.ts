type Timing<TCountdown> = {
    name: string;
    targetDate: Date;
    getCountdownUpdateFn: () => (setterFn: (val: TCountdown) => void) => () => void;
    isFulfilled: () => boolean;
};

export const createCooldownUpdater = (targetDate: Date) => {
    return (setCountdown: (msg: string) => void) => {
        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setCountdown("Done!");
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };

        updateCountdown(); // Initialize countdown immediately
        const interval = setInterval(updateCountdown, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    };
};

const votingClosedTiming: Timing<string> = {
    name: "Results Open",
    targetDate: new Date("2025-04-18:35:00"),
    getCountdownUpdateFn() {
        return createCooldownUpdater(this.targetDate);
    },
    isFulfilled() {
        return new Date() >= this.targetDate;
    },
};

const resultTiming: Timing<string> = {
    name: "Results Open",
    targetDate: new Date("2025-04-21T19:00:00"),
    getCountdownUpdateFn() {
        return createCooldownUpdater(this.targetDate);
    },
    isFulfilled() {
        return new Date() >= this.targetDate;
    },
};

export const timings = {
    results: resultTiming,
    votingClosed: votingClosedTiming,
};
