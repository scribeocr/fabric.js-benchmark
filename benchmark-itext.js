// Import Fabric.js
import * as fabric6 from './dist-v6/index.min.mjs';
import * as fabric6edit from './dist-v6-edit/index.min.mjs';
import * as fabric196bea1 from './dist-196bea1/index.mjs';
import * as fabric26ed225 from './dist-26ed225/index.mjs';

const runs = 5;

const time1Arr = [];
const time2Arr = [];
const time3Arr = [];
const time4Arr = [];
const time5Arr = [];

const createCanvasWithIText = (module, canvasId, dispose = true) => {
    const time1 = performance.now();
    // Create the canvas object
    const canvas = new module.Canvas(canvasId, {
        width: 2500,
        height: 3500
    });
    canvas.renderOnAddRemove = false;
    
    // Create IText objects with different strings
    for (let i = 0; i < 600; i++) {
        const text = `Text ${i + 1}`;
        const itext = new module.IText(text, {
            left: (i % 10) * 200, 
            top: Math.floor(i / 10) * 40, 
            fontSize: 24,
        });

        canvas.add(itext);
    }

    // Render the canvas
    canvas.renderAll();
    const time2 = performance.now();

    if (dispose) canvas.dispose();
    return time2 - time1;
};

for (let i=0; i<runs; i++) {
    time1Arr.push(createCanvasWithIText(fabric, 'canvas1'));
    time2Arr.push(createCanvasWithIText(fabric6, 'canvas1'));
    time3Arr.push(createCanvasWithIText(fabric196bea1, 'canvas1'));
    time4Arr.push(createCanvasWithIText(fabric26ed225, 'canvas1'));
    time5Arr.push(createCanvasWithIText(fabric6edit, 'canvas1', i + 1 < runs));
}

const mean = array => Math.round(array.reduce((a, b) => a + b) / array.length * 1e3) / 1e3;
const time1 = mean(time1Arr);
const time2 = mean(time2Arr);
const time3 = mean(time3Arr);
const time4 = mean(time4Arr);
const time5 = mean(time5Arr);

console.log(`Mean time v5: ${time1} ms vs. v6: ${time2} ms.`);
console.log(`Mean time 196bea1: ${time3} ms vs. 26ed225: ${time4} ms.`);
console.log(`Mean time v6: ${time2} ms vs. v6 edited: ${time5} ms.`);