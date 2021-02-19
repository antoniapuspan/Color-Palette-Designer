"use strict";
let myInput = document.getElementById("inputColor");
//
let colorA = document.querySelector("#colorA .colorbox");
let colorB = document.querySelector("#colorB .colorbox");
let colorC = document.querySelector("#colorC .colorbox");
let colorD = document.querySelector("#colorD .colorbox");
let colorE = document.querySelector("#colorE .colorbox");
//
let hexColor = document.querySelector(".hexColor span");
let rgbColor = document.querySelector(".rgbColor span");
let hslColor = document.querySelector(".hslColor span");

main();

function main() {
    //strores the value from the user
    let userColor = getUserData();
    
    //calls function for box color C
    setColorC(userColor);

    //displays hex color
    displayHexColor(userColor);

    //displays rgb color
    let myRgb = hexToRgb(userColor);
    displayRgbColor(myRgb);

   
    let myHsl = rgbToHsl(myRgb.r, myRgb.g, myRgb.b);
    displayHsl(myHsl);

    convertRgbToCssRgb(myRgb);
}

// Getting a selected color from the user
function getUserData() {
    let color = myInput.value;
    return color;
}

// Showing the color as a colored box in CSS
function setColorC(color) {
    colorC.style.backgroundColor = color;
}

// Showing the color as hex
function displayHexColor(x) {
    hexColor.innerHTML = x;
}

// Showing the color as RGB
function displayRgbColor(rgbObj) {
    let rgbString = rgbObj.r + ", " + rgbObj.g + ", " + rgbObj.b;
    rgbColor.innerHTML = rgbString;
}

// Showing the color as HSL
function displayHsl(x) {
    let hslString = x.h + " " + x.s + "% " + x.l + "%"; 
    hslColor.innerHTML = hslString;
}

// Converting RGB to CSS usable string, like rgb(100, 123, 192);
function convertRgbToCssRgb(rgbObj) {
    let cssString = "rgb(" + rgbObj.r + ", " + rgbObj.g + ", " + rgbObj.b + ")";
    return cssString;
}

// Converting hex to RGB
function hexToRgb(hexColor) {
    let hexR = hexColor.substring(1, 3);
    let hexG = hexColor.substring(3, 5);
    let hexB = hexColor.substring(5, 7);

    let r = hexToDec(hexR);
    let g = hexToDec(hexG);
    let b = hexToDec(hexB);
    let rgb = {
        r: r,
        g: g,
        b: b
    };
    return rgb;

}

function hexToDec(x) {
    let rgbX = parseInt(x, 16);
    return rgbX;
}

// Converting RGB to hex
function rgbToHex(color) {
    let rgbR = color.r;
    let rgbG = color.g;
    let rgbB = color.b;

    let r = hexToStr(rgbR);
    let g = hexToStr(rgbG);
    let b = hexToStr(rgbB);

    let hexColor = "#" + r + g + b;

    console.log(hexColor);
}

function hexToStr(x) {
    let hexX = x.toString(16);
    return hexX;
}

// Converting RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else
    if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else
    if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else
    if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / (Math.min(l, 1 - l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;
    
    h = h.toFixed(0);
    s = s.toFixed(0);
    l = l.toFixed(0);
    
    return {h,s,l};
}

function hslToRgb( hsl ) {
    const h = hsl.h;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
   
  let c = (1 - Math.abs(2 * l - 1)) * s,
  x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
  m = l - c / 2,
  r = 0,
  g = 0,
  b = 0;
  if (0 <= h && h < 60) {
  r = c;
  g = x;
  b = 0;
  } else if (60 <= h && h < 120) {
  r = x;
  g = c;
  b = 0;
  } else if (120 <= h && h < 180) {
  r = 0;
  g = c;
  b = x;
  } else if (180 <= h && h < 240) {
  r = 0;
  g = x;
  b = c;
  } else if (240 <= h && h < 300) {
  r = x;
  g = 0;
  b = c;
  } else if (300 <= h && h < 360) {
  r = c;
  g = 0;
  b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return {r,g,b};
  }