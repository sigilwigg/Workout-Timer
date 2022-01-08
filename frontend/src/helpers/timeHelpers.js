export function calcTimeElapsed(time, format) {
    let timeElapsed = {
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60),
        miliseconds: Math.floor((time % 1000) / 100),
    };

    if (format == 'display') {
        return `${timeElapsed.minutes}:${timeElapsed.seconds}:${timeElapsed.miliseconds}`;
    }

    return timeElapsed;
}