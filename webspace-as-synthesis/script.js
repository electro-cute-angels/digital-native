
// digital native - Webspace–as–synthesis.
// Each section is commented to explain what it does and how you can modify it.

window.addEventListener('DOMContentLoaded', () => {
    // Sequence 1: Alert and prompt
    // These show basic browser dialogs. You can change the text below to customize the messages.
    alert('This is an alert!');
    let name = prompt('This is a prompt! What is your name?');
    if (name) {
        document.title = `Hello, ${name}!`;
    }

    // Sequence 4: Pop-up windows frame
    // This function spawns pop-up windows around the main window, each with a letter from 'WEBSPACE'.
    // You can change 'WEBSPACE' to any string to show different letters.
    function burstPopups() {
        const burstLetters = 'WEBSPACE';
        const burstCount = burstLetters.length;
        const centerX = window.screenX + window.outerWidth / 2;
        const centerY = window.screenY + window.outerHeight / 2;
        const radius = 220;
        for (let i = 0; i < burstCount; i++) {
            const angle = (2 * Math.PI * i) / burstCount;
            const x = Math.round(centerX + radius * Math.cos(angle) - 80);
            const y = Math.round(centerY + radius * Math.sin(angle) - 80);
            const win = window.open('', '', `width=160,height=160,top=${y},left=${x}`);
            if (win) {
                win.document.write(`<!DOCTYPE html><html><head><title>ASCII Pop</title><style>
body { background: #000; color: #ff0000; margin: 0; padding: 0; width: 100vw; height: 100vh; min-width: 100vw; min-height: 100vh; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-family: 'Fira Mono', 'Consolas', 'Courier New', monospace; cursor: crosshair; }
.ascii-frame { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 3em; border: 1px dashed #ff0000; background: #000; }
</style></head><body><div class='ascii-frame'>${burstLetters[i]}</div></body></html>`);
            }
        }
    }
    if (name !== null) burstPopups();

    // Sequence 2: Timed chat bubbles
    // This array contains the messages shown in the chat sequence. You can add, remove, or change these.
    const messages = [
        {text: 'Sequence 1: alert + prompt'},
        {text: 'Sequence 2: timed stream'},
        {text: 'Sequence 3: :hover tokens for ASCII'},
        {text: 'Sequence 4: pop-up windows'},
        {text: 'digital native - webspace–as–synthesis'}
    ];
    const chatSequence = document.getElementById('chat-sequence');
    let idx = 0;
    // This function creates a fixed-width ASCII art chat bubble for each message.
    // You can change the width or style here for different effects.
    function asciiBubble(text) {
        const width = 30;
        let content = text;
        if (content.length > width) content = content.slice(0, width);
        return `+${'-'.repeat(width)}+
|${content.padEnd(width, ' ')}|
${'-'.repeat(width)}+`;
    }
    // This function reveals each chat bubble at 900ms intervals.
    function revealNextChat() {
        if (idx < messages.length) {
            const msg = document.createElement('div');
            msg.className = 'chat-bubble';
            msg.textContent = asciiBubble(messages[idx].text);
            chatSequence.appendChild(msg);
            idx++;
            setTimeout(revealNextChat, 900);
        }
    }
    revealNextChat();

    // Sequence 3: Hover tokens for ASCII
    // These tokens show ASCII art when hovered. You can change the ASCII art in the HTML data-ascii attributes.
    const tokens = document.querySelectorAll('.token');
    tokens.forEach(token => {
        token.addEventListener('mouseenter', () => {
            token.textContent = token.dataset.ascii;
            playBeep();
        });
        token.addEventListener('mouseleave', () => {
            token.textContent = token.textContent[0];
        });
    });

    // This function plays a short beep sound using WebAudio when you hover a token.
    function playBeep() {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(330 + Math.random()*220, ctx.currentTime);
        oscillator.connect(ctx.destination);
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            ctx.close();
        }, 80);
    }

    // Pop-up frame button
    // Clicking this button spawns the pop-up windows again.
    const popupBtn = document.getElementById('popup-btn');
    popupBtn.addEventListener('click', () => {
        burstPopups();
    });

    // Invert colors button
    // This button applies a CSS filter to invert all colors on the page.
    // You can use other filters for different effects.
    const invertBtn = document.getElementById('invert-btn');
    invertBtn.addEventListener('click', () => {
        document.body.style.filter = document.body.style.filter === 'invert(1)' ? '' : 'invert(1)';
    });

    // Speak sequence button
    // This button uses browser speech synthesis to read the chat sequence aloud.
    // You can change the rate, pitch, or text here.
    const speakBtn = document.getElementById('speak-btn');
    speakBtn.addEventListener('click', () => {
        const utter = new window.SpeechSynthesisUtterance(messages.map(m => m.text).join('. '));
        utter.rate = 1;
        utter.pitch = 1;
        window.speechSynthesis.speak(utter);
    });

    // Custom cursor for the whole page
    // You can change the cursor style here. Try 'crosshair', 'pointer', or a custom URL.
    document.body.style.cursor = 'crosshair';

    // Animated cursor button
    // This button moves a fake cursor in a square path on the page.
    // Students can modify the path, speed, or shape.
    const animateCursorBtn = document.getElementById('animate-cursor-btn');
    let fakeCursor = null;
    animateCursorBtn.addEventListener('click', () => {
        if (fakeCursor) {
            fakeCursor.remove();
            fakeCursor = null;
            return;
        }
        fakeCursor = document.createElement('div');
        fakeCursor.style.position = 'fixed';
        fakeCursor.style.width = '18px';
        fakeCursor.style.height = '18px';
        fakeCursor.style.background = '#ff0000';
        fakeCursor.style.border = '2px solid #000';
        fakeCursor.style.borderRadius = '50%';
        fakeCursor.style.zIndex = '9999';
        fakeCursor.style.pointerEvents = 'none';
        document.body.appendChild(fakeCursor);
        // Animate in a square
        const size = 120;
        const startX = window.innerWidth / 2 - size / 2;
        const startY = window.innerHeight / 2 - size / 2;
        let step = 0;
        function moveCursor() {
            let x = startX, y = startY;
            if (step < size) {
                x += step;
            } else if (step < size * 2) {
                x += size;
                y += step - size;
            } else if (step < size * 3) {
                x += size - (step - size * 2);
                y += size;
            } else if (step < size * 4) {
                y += size - (step - size * 3);
            }
            fakeCursor.style.left = x + 'px';
            fakeCursor.style.top = y + 'px';
            step++;
            if (step < size * 4) {
                requestAnimationFrame(moveCursor);
            } else {
                fakeCursor.remove();
                fakeCursor = null;
            }
        }
        moveCursor();
    });
});
