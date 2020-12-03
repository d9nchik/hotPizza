let position = 0;
let NUMBER_OF_POSITIONS;
const PERCENT_OF_MOVE = -100;
let movePart;
const ANIMATION_TIME = 1000 * 5;
const WAIT_TIME = 1000 * 3;
let previous;
let isBack = false;
let style;

export function startAnimation(
    numberOfPositions,
    movePartGiven,
    styleAdditional
) {
    style = styleAdditional;
    NUMBER_OF_POSITIONS = numberOfPositions;
    movePart = movePartGiven;
    previous = performance.now();
    requestAnimationFrame(function scroll(time) {
        if (!movePartGiven.offsetParent) {
            return;
        }
        if (previous + WAIT_TIME > time) {
            if (previous > time) {
                if (!isBack) {
                    animate(
                        PERCENT_OF_MOVE *
                            ((time - previous) / ANIMATION_TIME + position)
                    );
                } else {
                    animate(
                        PERCENT_OF_MOVE *
                            ((previous - time) / ANIMATION_TIME + position)
                    );
                }
            } else {
                animate(PERCENT_OF_MOVE * position);
            }
        } else {
            previous = time + ANIMATION_TIME;
            animate(PERCENT_OF_MOVE * position);
            if (isBack) {
                position -= 1;
                if (position === -1) {
                    isBack = false;
                    position = 1;
                }
            } else {
                position = position + 1;
                if (position === NUMBER_OF_POSITIONS) {
                    isBack = true;
                    position = NUMBER_OF_POSITIONS - 2;
                }
            }
        }
        requestAnimationFrame(scroll);
    });
}

function animate(percentOfMove) {
    movePart.setAttribute(
        'style',
        style + 'margin-left: ' + percentOfMove + '%;'
    );
}

export function nextSlide() {
    previous = performance.now();
    position++;
    if (position === NUMBER_OF_POSITIONS) {
        isBack = true;
        position = NUMBER_OF_POSITIONS - 1;
    }
    animate(PERCENT_OF_MOVE * position);
}

export function previousSlide() {
    previous = performance.now();
    position--;
    if (position === -1) {
        isBack = false;
        position = 0;
    }
    animate(PERCENT_OF_MOVE * position);
}
