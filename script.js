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
    // setColorC(userColor);
    let checkedOption1 = document.getElementById("option1").checked;
    let checkedOption2 = document.getElementById("option2").checked;
    let checkedOption3 = document.getElementById("option3").checked;
    let checkedOption4 = document.getElementById("option4").checked;
    let checkedOption5 = document.getElementById("option5").checked;
    let checkedOption6 = document.getElementById("option6").checked;

    //runs function for one option selected
    let colorSet;
    if (checkedOption1) {
        console.log("option1")
        colorSet = generateAnalogous(userColor);
    } else if (checkedOption2) {
        console.log("option2")
        colorSet = generateMonochromatic(userColor);
    } else if (checkedOption3) {
        console.log("option3")
        colorSet = generateTriad(userColor);
    } else if (checkedOption4) {
        console.log("option4")
        colorSet = generateComplementary(userColor);
    } else if (checkedOption5) {
        console.log("option5")
        colorSet = generateCompound(userColor);
    } else if (checkedOption6) {
        console.log("option6")
        colorSet = generateShades(userColor);
    }

    colorSet.forEach(colorbox => {
        displayColorInfo(colorbox.color, colorbox.index);
    });
}

// Getting a selected color from the user
function getUserData() {
    let color = myInput.value;
    return color;
}

function displayColorInfo(color, index) {
    // convert from hex to rgb, hsl, css and so on
    let rgb = hexToRgb(color);
    let myHsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // display those different colors ...
    showHexColor(color, index);
    showRbgColor(rgb, index);
    showHslColor(myHsl, index);
    showColorBox(rgb, index);
}

// display functions
function showHexColor(hex, index) {
    document.querySelector(`#color${index} .hexColor .value`).textContent = hex;
}

function showRbgColor(rgb, index) {
    document.querySelector(`#color${index} .rgbColor .value`).textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function showHslColor(hsl, index) {
    document.querySelector(`#color${index} .hslColor .value`).textContent = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

function showColorBox(rgb, index) {
    document.querySelector(`#color${index} .colorbox`).style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
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

    return hexColor;
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

    // console.log(r, g, b);
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

    h = parseInt(h.toFixed(0));
    s = parseInt(s.toFixed(0));
    l = parseInt(l.toFixed(0));

    return {
        h,
        s,
        l
    };
}

//Converting from HSL to HEX
function hslToHex(h,s,l) {
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0, 
        b = 0; 
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
  
    // Prepend 0s, if necessary
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

  //Converting from HSL to RGB
function hslToRgb(hsl) {
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

    return {
        r,
        g,
        b
    };
}

//Function Analogous Harmony
function generateAnalogous(colorC) {
    let rgbC = hexToRgb(colorC);
    let hslC = rgbToHsl(rgbC.r, rgbC.g, rgbC.b);

    let hslA = {
        h: shiftH(hslC.h, -40),
        s: hslC.s,
        l: hslC.l
    }
    let hslB = {
        h: shiftH(hslC.h, -20),
        s: hslC.s,
        l: hslC.l
    }
    let hslD = {
        h: shiftH(hslC.h, 20),
        s: hslC.s,
        l: hslC.l
    }
    let hslE = {
        h: shiftH(hslC.h, 40),
        s: hslC.s,
        l: hslC.l
    }

    let hexA = hslToHex(hslA.h, hslA.s, hslA.l);
    let hexB = hslToHex(hslB.h, hslB.s, hslB.l);
    let hexD = hslToHex(hslD.h, hslD.s, hslD.l);
    let hexE = hslToHex(hslE.h, hslE.s, hslE.l);

    let colorBoxes = [{
            color: hexA,
            index: "A"
        },
        {
            color: hexB,
            index: "B"
        },
        {
            color: colorC,
            index: "C"
        },
        {
            color: hexD,
            index: "D"
        },
        {
            color: hexE,
            index: "E"
        }

    ];
    return colorBoxes;

}

//Function Monochromatic Harmony
function generateMonochromatic(colorC) {

    let rgbC = hexToRgb(colorC);
    let hslC = rgbToHsl(rgbC.r, rgbC.g, rgbC.b);
    console.log(hslC.h)

    let hslA = {
        h: hslC.h,
        s: hslC.s,
        l: shiftValue(hslC.l, -70)
    }
    let hslB = {
        h: hslC.h,
        s: shiftValue(hslC.s, -50),
        l: hslC.l
    }
    let hslD = {
        h: hslC.h,
        s: shiftValue(hslC.s, -25),
        l: hslC.l
    }
    let hslE = {
        h: hslC.h,
        s: hslC.s,
        l: shiftValue(hslC.l, -30)
    }

    console.log(hslA,
        hslB,
        hslD,
        hslE)

    let hexA = hslToHex(hslA.h, hslA.s, hslA.l);
    let hexB = hslToHex(hslB.h, hslB.s, hslB.l);
    let hexD = hslToHex(hslD.h, hslD.s, hslD.l);
    let hexE = hslToHex(hslE.h, hslE.s, hslE.l);


    let colorBoxes = [{
            color: hexA,
            index: "A"
        },
        {
            color: hexB,
            index: "B"
        },
        {
            color: colorC,
            index: "C"
        },
        {
            color: hexD,
            index: "D"
        },
        {
            color: hexE,
            index: "E"
        }

    ];
    return colorBoxes;

}

//Function Triad Harmony
function generateTriad(colorC) {
    let rgbC = hexToRgb(colorC);
    let hslC = rgbToHsl(rgbC.r, rgbC.g, rgbC.b);

    let hslA = {
        h: hslC.h,
        s: shiftValue(hslC.s, -10),
        l: shiftValue(hslC.s, -30)
    }
    let hslB = {
        h: shiftH(hslC.h, -120),
        s: hslC.s,
        l: hslC.l
    }
    let hslD = {
        h: shiftH(hslC.h, 120),
        s: shiftValue(hslC.s, -10),
        l: hslC.l
    }
    let hslE = {
        h: shiftH(hslC.h, 120),
        s: shiftValue(hslC.s, -5),
        l: shiftValue(hslC.s, -30)
    }
    let hexA = hslToHex(hslA.h, hslA.s, hslA.l);
    let hexB = hslToHex(hslB.h, hslB.s, hslB.l);
    let hexD = hslToHex(hslD.h, hslD.s, hslD.l);
    let hexE = hslToHex(hslE.h, hslE.s, hslE.l);

    let colorBoxes = [{
            color: hexA,
            index: "A"
        },
        {
            color: hexB,
            index: "B"
        },
        {
            color: colorC,
            index: "C"
        },
        {
            color: hexD,
            index: "D"
        },
        {
            color: hexE,
            index: "E"
        }

    ];
    return colorBoxes;

}

//Function Complentary Harmony
function generateComplementary(colorC) {
    let rgbC = hexToRgb(colorC);
    let hslC = rgbToHsl(rgbC.r, rgbC.g, rgbC.b);

    let hslA = {
        h: hslC.h,
        s: hslC.s,
        l: shiftValue(hslC.l, -30),
    }
    let hslB = {
        h: hslC.h,
        s: shiftValue(hslC.s, -10),
        l: shiftValue(hslC.s, -30),
    }
    let hslD = {
        h: shiftH(hslC.h, 180),
        s: shiftValue(hslC.s, -70),
        l: shiftValue(hslC.l, -30)
    }
    let hslE = {
        h: shiftH(hslC.h, 180),
        s: hslC.s,
        l: hslC.l
    }
    let hexA = hslToHex(hslA.h, hslA.s, hslA.l);
    let hexB = hslToHex(hslB.h, hslB.s, hslB.l);
    let hexD = hslToHex(hslD.h, hslD.s, hslD.l);
    let hexE = hslToHex(hslE.h, hslE.s, hslE.l);

    let colorBoxes = [{
            color: hexA,
            index: "A"
        },
        {
            color: hexB,
            index: "B"
        },
        {
            color: colorC,
            index: "C"
        },
        {
            color: hexD,
            index: "D"
        },
        {
            color: hexE,
            index: "E"
        }

    ];
    return colorBoxes;

}

//Function Compound Harmony
function generateCompound(colorC) {
    let rgbC = hexToRgb(colorC);
    let hslC = rgbToHsl(rgbC.r, rgbC.g, rgbC.b);

    let hslA = {
        h: shiftH(hslC.h, 20),
        s: shiftValue(hslC.s, -10),
        l: shiftValue(hslC.l, -20)
    }
    let hslB = {
        h: shiftH(hslC.h, 20),
        s: shiftValue(hslC.s, -40),
        l: shiftValue(hslC.l, -40)
    }
    let hslD = {
        h: shiftH(hslC.h, 120),
        s: shiftValue(hslC.s, -20),
        l: shiftValue(hslC.l, -8)
    }
    let hslE = {
        h: shiftH(hslC.h, 100),
        s: shiftValue(hslC.s, -10),
        l: shiftValue(hslC.l, -20)
    }

    let hexA = hslToHex(hslA.h, hslA.s, hslA.l);
    let hexB = hslToHex(hslB.h, hslB.s, hslB.l);
    let hexD = hslToHex(hslD.h, hslD.s, hslD.l);
    let hexE = hslToHex(hslE.h, hslE.s, hslE.l);

    let colorBoxes = [{
            color: hexA,
            index: "A"
        },
        {
            color: hexB,
            index: "B"
        },
        {
            color: colorC,
            index: "C"
        },
        {
            color: hexD,
            index: "D"
        },
        {
            color: hexE,
            index: "E"
        }

    ];
    return colorBoxes;

}

//Function Shades Harmony
function generateShades(colorC) {

    let rgbC = hexToRgb(colorC);
    let hslC = rgbToHsl(rgbC.r, rgbC.g, rgbC.b);
    console.log(hslC.h)

    let hslA = {
        h: hslC.h,
        s: hslC.s,
        l: shiftValue(hslC.l, -85)
    }
    let hslB = {
        h: hslC.h,
        s: hslC.s,
        l: shiftValue(hslC.l, -50)
    }
    let hslD = {
        h: hslC.h,
        s: hslC.s,
        l: shiftValue(hslC.l, -65)
    }
    let hslE = {
        h: hslC.h,
        s: hslC.s,
        l: shiftValue(hslC.l, -30)
    }

    console.log(hslA,
        hslB,
        hslD,
        hslE)

    let hexA = hslToHex(hslA.h, hslA.s, hslA.l);
    let hexB = hslToHex(hslB.h, hslB.s, hslB.l);
    let hexD = hslToHex(hslD.h, hslD.s, hslD.l);
    let hexE = hslToHex(hslE.h, hslE.s, hslE.l);


    let colorBoxes = [{
            color: hexA,
            index: "A"
        },
        {
            color: hexB,
            index: "B"
        },
        {
            color: colorC,
            index: "C"
        },
        {
            color: hexD,
            index: "D"
        },
        {
            color: hexE,
            index: "E"
        }

    ];
    return colorBoxes;

}

//Function Shift h a number of degrees from colorC
function shiftH(h, deg) {
    let x = h + deg;
    if (x > 359) {
        x = x - 360;
    } else if (x < 0) {
        x = x + 360;
    }
    return x;
}

//Function Shift value s or l a number of %
function shiftValue(value, percentage) {
    let x = value + value * percentage / 100;
    if (x > 100) {
        x = 100;
    } else if (x <= 0) {
        x = 0
    }
    return x;
}