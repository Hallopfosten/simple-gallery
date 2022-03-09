const backUpBtn = document.getElementById("backUp");
const images = document.getElementsByClassName("img");
const blocker = document.getElementById("blocker");

backUpBtn.addEventListener("click", topFunction);

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backUpBtn.style.display = "block";
    } else {
        backUpBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

Array.from(images).forEach(element => {
    element.addEventListener("click", () => {
        if (element.classList.contains("magnify")) {
            removeMagnify(element)
        } else {
            addMagnify(element)
        }
    });
})

window.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
        Array.from(images).forEach(element => {
            removeMagnify(element)
        });
    }
})

function addMagnify(element) {
    element.classList.add("magnify");
    blocker.style.display = "block";
    blocker.addEventListener("click", () => {
        Array.from(images).forEach(element => {
            removeMagnify(element)
        });
    });
    disableScroll();
}

function removeMagnify(element) {
    element.classList.remove("magnify");
    blocker.style.display = "none";
    enableScroll();
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('touchmove', preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
