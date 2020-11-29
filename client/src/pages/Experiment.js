import React, {useState, useEffect} from 'react';
import ExperimentComponent from "../components/ExperimentComponent";
import { v4 as uuidv4 } from 'uuid';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

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

function emotionNumToString(num) {
    switch(num) {
        case 0:
            return "Angry";
        case 1:
            return "Confused";
        case 2:
            return "Happy";
        case 3:
            return "Sad";
        default:
            return "Happy";
    }
}

function generateTrial() {
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
        experiment.push([emotion2, img2[i], masked2[i]]);
    }

    shuffle(experiment);

    return [emotion1, emotion2, experiment]
}

function Experiment() {
    let [emot1, emot2, exp] = generateTrial();
    const [emotion1, setEmotion1] = useState(emot1);
    const [emotion2, setEmotion2] = useState(emot2);
    const [experiment, setExperiment] = useState(exp);
    const [socket, setSocket] = useState(socketIOClient(ENDPOINT));
    const [uuid, setUUID] = useState(uuidv4());

    useEffect(() => {
        console.log("RUNNING");
        // CLEAN UP THE EFFECT
        return () => socket.disconnect();

    }, [socket]);

    return <ExperimentComponent emotion1={emotion1}
                                emotion2={emotion2}
                                experiment={experiment}
                                onreset = {() => {
                                    let [new_emot1, new_emot2, new_exp] = generateTrial();
                                    setEmotion1(new_emot1);
                                    setEmotion2(new_emot2);
                                    setExperiment(new_exp);
                                }}
                                ontrial={(trial, picked_e1, time) => {
                                    let otherEmotion = trial[0] === emotion1 ? emotion2 : emotion1;
                                    let pickedEmotion = picked_e1 ? emotion1 : emotion2;
                                    socket.emit("trial", {
                                        "actual_emotion": emotionNumToString(trial[0]),
                                        "other_emotion": emotionNumToString(otherEmotion),
                                        "picked_emotion": emotionNumToString(pickedEmotion),
                                        "correct": trial[0] === pickedEmotion,
                                        "image_number": trial[1],
                                        "mask": trial[2],
                                        "time": time,
                                        "userid": uuid,
                                    })
                                }}
    />
}

export default Experiment;
