// Import Fabric.js
import * as fabric6 from './dist-v6/index.min.mjs';

const runs = 5;

const time1Arr = [];
const time2Arr = [];

const createCanvasWithIText = (fabric, canvasId, run) => {
    const time1 = performance.now();
    // Create the canvas object
    const canvas = new fabric.Canvas(canvasId, {
        width: 2500,
        height: 3500
    });
    canvas.renderOnAddRemove = false;
    
    // Create IText objects with different strings
    for (let i = 0; i < 600; i++) {
        const text = `Text ${i + 1}`;
        const itext = new fabric.IText(text, {
            left: (i % 10) * 200, 
            top: Math.floor(i / 10) * 40, 
            fontSize: 24,
        });

        canvas.add(itext);
    }

    // Render the canvas
    canvas.renderAll();
    const time2 = performance.now();

    if (run + 1 < runs) canvas.dispose();
    return time2 - time1;
};

for (let i=0; i<runs; i++) {
    time1Arr.push(createCanvasWithIText(fabric, 'canvas1', i));
    time2Arr.push(createCanvasWithIText(fabric6, 'canvas2', i));
}

const mean = array => Math.round(array.reduce((a, b) => a + b) / array.length * 1e3) / 1e3;
const time1 = mean(time1Arr);
const time2 = mean(time2Arr);
console.log(`Mean time v5: ${time1} ms vs. v6: ${time2} ms.`);