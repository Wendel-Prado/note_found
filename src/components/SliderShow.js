'use client'
import React from 'react';
import PptxGenJS from 'pptxgenjs';

function SlideShow (text, art,mus) {
  if(text && art && mus){
    const pptx = new PptxGenJS();
    const slides = text.split('\n\n');

    slides.forEach((slideText) => {
      const slide = pptx.addSlide();
      slide.addText(slideText, { x: 0,
        y: 1,
        w: "100%",
        h: 2,
        align: "center",
        color: "0088CC",
        fill: "F1F1F1",
        fontSize: 24 });
      slide.background = { color: "F1F1F1" }
    });

    pptx.writeFile({ fileName: `${art} - ${mus}`});
  }
};

export default SlideShow;
