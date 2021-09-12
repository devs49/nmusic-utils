// https://github.com/paulrosen/abcjs
// https://paulrosen.github.io/abcjs/
// https://abcnotation.com/wiki/abc:standard:v2.1

import {DOMParser, parseHTML} from 'linkedom';
// import abcjs from "abcjs";

const {
  // note, these are *not* globals
  window, document, customElements,
  HTMLElement,
  Event, CustomEvent
} = parseHTML(`
  <!doctype html>
  <html lang="en">
    <body>
      <div id="vf"></div>
    </body>
  </html>
`);

const arg = process.argv[2]

const notes = {
  '0': 'z',
  '1': 'C',
  '2': 'D',
  '3': 'E',
  '4': 'F',
  '5': 'G',
  '6': 'A',
  '7': 'B', 
  '8': 'c', // c5
  '9': 'd', // d5
  'A': 'e', // e5
  'B': 'f', // f5
  'C': 'g', // g5
  'D': 'a', // a5
  'E': 'b', // b5
}

const digits = arg.split('')

let abcString = ""
for (let i=0; i<digits.length; i++) {
  if (i && i%4 === 0) abcString += "|";

  abcString += notes[digits[i]]
}

import("abcjs")
  .then((abcjs) => {

    window.addEventListener("resize", () => {
      resizeOuter(window);
    });
    window.addEventListener("orientationChange", () => {
      resizeOuter(window);
    });

    abcjs.default.renderAbc("vf", ("X:1\nK:C\nL:1/4\n" + abcString), null, null, null, document);

    const divSvg = document.querySelector('#vf').toString()
    let svg = divSvg.match(/<svg(.+)\/svg>/)[0]
    svg = svg.substring(svg.indexOf("<title>"))
    svg = `<svg xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff" height="415" width="415">` + svg
    console.log(svg)

  })
