const backUpBtn = document.getElementById("backUp");
const backToTop = document.getElementById("backToTop");
const toBottom = document.getElementById("toBottom");
const images = document.getElementsByClassName("img");
const blocker = document.getElementById("blocker");
var header = document.getElementById("header");
var sticky = header.offsetTop - header.offsetHeight;
const gallery = document.getElementById("galleryWrapper");

backUpBtn.addEventListener("click", topFunction);
backToTop.addEventListener("click", topFunction);
toBottom.addEventListener("click", bottomFunction);

window.onresize = function () {
    document.getElementById("header");
    sticky = header.offsetTop - header.offsetHeight
};

// "scroll to top/bottom"-button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backUpBtn.style.display = "block";
    } else {
        backUpBtn.style.display = "none";
    }
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        gallery.style.paddingTop = header.offsetHeight + "px";
    } else {
        header.classList.remove("sticky");
        gallery.style.paddingTop = 0
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function bottomFunction() {
    document.getElementById("footer").scrollIntoView();
}

// magnify images
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

// disable scrolling while image is magnified 
const keys = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1 };

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
