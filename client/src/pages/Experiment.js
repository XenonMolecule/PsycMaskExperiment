import React from 'react';
import ExperimentComponent from "../components/ExperimentComponent";

const SAMPLES_PER_CLASS_PER_TRIAL = 6;

//////////////////////////////////////////////////////////////////
//                                                              //
//                         HELPER METHODS                       //
//                                                              //
//////////////////////////////////////////////////////////////////
function generateFaceNums(amt, max) {
    let nums = new Set();
    let random = Math.floor(Math.random() * max);
    if (amt > max) {
        return [];
    }
    while (nums.size < amt) {
        while (nums.has(random)) {
            random = Math.floor(Math.random() * max);
        }
        nums.add(random);
    }
    return Array.from(nums);
}

function generateMaskVsUnmasked(amt) {
    let gen = [];
    while (gen.length < amt) {
        gen.push(Math.floor(Math.random() * 2) === 1);
    }
    return gen;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function Experiment() {
    let emotion1 = Math.floor(Math.random() * 4);
    let emotion2 = emotion1;
    while (emotion2 === emotion1) {
        emotion2 = Math.floor(Math.random() * 4);
    }

    let img1 = generateFaceNums(SAMPLES_PER_CLASS_PER_TRIAL, 12);
    let img2 = generateFaceNums(SAMPLES_PER_CLASS_PER_TRIAL, 12);

    let masked1 = generateMaskVsUnmasked(SAMPLES_PER_CLASS_PER_TRIAL);
    let masked2 = generateMaskVsUnmasked(SAMPLES_PER_CLASS_PER_TRIAL);

    let experiment = [];
    for (let i = 0; i < SAMPLES_PER_CLASS_PER_TRIAL; i ++) {
        experiment.push([emotion1, img1[i], masked1[i]]);
    }
    for (let i = 0; i < SAMPLES_PER_CLASS_PER_TRIAL; i ++) {
        experiment.push([emotion1, img2[i], masked2[i]]);
    }

    shuffle(experiment);

    return <ExperimentComponent emotion1={emotion1} emotion2={emotion2} experiment={experiment}/>
}

export default Experiment;
