// THEME COLORS
var primaryBlack='#232323';
var primaryWhite='#F2F2F2';

var textColor = primaryBlack;
var switchStatus;

const typedTextSpan = $(".typed-text");
const cursorSpan = $(".cursor");

const textArray = ["an empathetic", "a collaborative", "a thoughtful", "a flexible", "a consistent"];
const typingDelay = 75;
const erasingDelay = 50;
const newTextDelay = 1000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

// SVG ICON LIST
const iconArray = ["arrow-right-icon", "about-arrow", "work-arrow", "arrow-left-icon", "quote-icon"];

// TYPING EFFECT: TYPE
function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.hasClass("typing")) {
            cursorSpan.addClass("typing");
        };

        $(".typed-text").append(textArray[textArrayIndex].charAt(charIndex));
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.removeClass("typing");
        setTimeout(erase, newTextDelay);
    }
}

// TYPING EFFECT: ERASE
function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.hasClass("typing")) {
            cursorSpan.addClass("typing");
        }
        $(".typed-text").text(textArray[textArrayIndex].substring(0, charIndex-1));
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.removeClass("typing");
        textArrayIndex++;
        if (textArrayIndex>=textArray.length) {
            textArrayIndex=0;
        }
        setTimeout(type, typingDelay + 1100);
    }
}

// CHANGES ICON SVG COLOR ON DARK MODE SWITCH
// on load
function changeColorPath(id) {
    var element = document.getElementById(id);
    if (element != null) {
        var doc = element.getSVGDocument();
        if (doc != null) {
            var path = doc.querySelector("path");
            path.setAttribute("fill", textColor);
        }
    }
}

function changeColorLine(id) {
    var element = document.getElementById(id);
    if (element != null) {
        var doc = element.getSVGDocument();
        if (doc != null) {
            var lines = doc.querySelectorAll('line');
            lines.forEach(function(line) {
                line.setAttribute("stroke", textColor);
            });
        }
    }
}

// 
function iconColorSwitch() {
    iconArray.forEach( function(iconName){
        var element = document.getElementById(iconName);
        console.log(element);
        if (element != null) {
            var doc = element.getSVGDocument();
            if (doc != null) {
                var path = doc.querySelector("path");
                path.setAttribute("fill", textColor);
            }
        }
    });
}

function iconChevronSwitch() {
    var element = document.getElementById("chevron-down");
    if (element != null) {
        var doc = element.getSVGDocument();
        if (doc != null) {
            var lines = doc.querySelectorAll('line');
            lines.forEach(function(line) {
                line.setAttribute("stroke", textColor);
            });
        }
    }
}

// TYPING EFFECT LOAD
document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
    if(textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
});

$(function(){
    // INITIALIZE DARK MODE STATUS
    if (sessionStorage.darkMode) {
        switchStatus = sessionStorage.darkMode;
        if (sessionStorage.darkMode == 'true') {
            document.getElementById("darkMode").checked = true;
            document.documentElement.style.setProperty('--background-color', primaryBlack);
            document.documentElement.style.setProperty('--text-color', primaryWhite);
            textColor = primaryWhite;
        } else {
            document.getElementById("darkMode").checked = false;
            document.documentElement.style.setProperty('--background-color', primaryWhite);
            document.documentElement.style.setProperty('--text-color', primaryBlack);
            textColor = primaryBlack;
        }
    }

    // HAMBURGER MENU TOGGLE
    $("#menu-toggle").on('click', function() {
        $("#primary-nav-list").slideToggle();
    });

    // DARK MODE SWITCH: ON PRESS
    $("#darkMode").on('change', function() {
        var darkMode;
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            document.documentElement.style.setProperty('--background-color', primaryBlack);
            document.documentElement.style.setProperty('--text-color', primaryWhite);
            textColor = primaryWhite;
            darkMode = true;
        }
        else {
           switchStatus = $(this).is(':checked');
           document.documentElement.style.setProperty('--background-color', primaryWhite);
           document.documentElement.style.setProperty('--text-color', primaryBlack);
           textColor = primaryBlack;
           darkMode = false;
        }

        // CHANGE ICON COLORS
        iconColorSwitch();
        iconChevronSwitch();
        sessionStorage.setItem('darkMode', darkMode);
    });
});