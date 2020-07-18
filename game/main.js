function drawAnim() {
    const cx = document.querySelector('canvas').getContext('2d');
    const img = document.createElement('img');
    img.src = './sprite/Man.png';
    const spriteWidth = 48;
    const spriteHeight = 48;
    let positionX = 0;

    img.addEventListener('load', () => {
        cx.clearRect(0, 0, 1366, spriteHeight);
        cx.drawImage(img,
            0 * spriteWidth, 1 * spriteHeight, spriteWidth, spriteHeight,
            0, 0, spriteWidth, spriteHeight);
    });

    let intervalId = null;
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowRight' && intervalId == null) {
            let cycle = 0;
            intervalId = setInterval(() => {
                cx.clearRect(0, 0, 1366, spriteHeight);
                cx.drawImage(img,
                    cycle * spriteWidth, 0, spriteWidth, spriteHeight,
                    positionX, 0, spriteWidth, spriteHeight);
                cycle = (cycle + 1) % 6;
                positionX += 2;
                console.log(cycle);
            }, 165);
        } else if (e.code === 'Space' && intervalId == null) {
            let cycle = 0;
            intervalId = setInterval(() => {
                cx.clearRect(0, 0, 1366, spriteHeight);
                cx.drawImage(img,
                    cycle * spriteWidth, 2 * spriteHeight, spriteWidth, spriteHeight,
                    positionX, 0, spriteWidth, spriteHeight);
                    cycle += 1;
            }, 165);
            setTimeout(() => {
                clearInterval(intervalId);
                intervalId = null;
                cx.clearRect(0, 0, 1366, spriteHeight);
                cx.drawImage(img,
                    0 * spriteWidth, 1 * spriteHeight, spriteWidth, spriteHeight,
                    positionX, 0, spriteWidth, spriteHeight);
            }, 165 * 4);
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowRight') {
            clearInterval(intervalId);
            intervalId = null;
            cx.clearRect(0, 0, 1366, spriteHeight);
            cx.drawImage(img,
                0 * spriteWidth, 1 * spriteHeight, spriteWidth, spriteHeight,
                positionX, 0, spriteWidth, spriteHeight);
        }
    });
}