import React, {useState, useEffect} from 'react';
import "../static/css/experiment.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngry } from '@fortawesome/free-solid-svg-icons';
import { faDizzy } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';

import Button from 'react-bootstrap/Button';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

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

function emotionNumToIcon(num) {
    switch(num) {
        case 0:
            return <FontAwesomeIcon icon={faAngry}/>;
        case 1:
            return <FontAwesomeIcon icon={faDizzy}/>;
        case 2:
            return <FontAwesomeIcon icon={faSmile}/>;
        case 3:
            return <FontAwesomeIcon icon={faSadTear}/>;
        default:
            return <FontAwesomeIcon icon={faSmile}/>;
    }
}

function emotionNumToColor(num) {
    switch(num) {
        case 0:
            return "#FF867F";
        case 1:
            return "#BAFF80";
        case 2:
            return "#FFF480";
        case 3:
            return "#81C0FF";
        default:
            return "#FFF480";
    }
}

function Experiment() {
    const [step, setStep] = useState(0);

    let emotion1 = Math.floor(Math.random() * 4);
    let emotion2 = emotion1;
    while (emotion2 == emotion1) {
        emotion2 = Math.floor(Math.random() * 4);
    }

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            // setResponse(data);
        });

        // CLEAN UP THE EFFECT
        return () => socket.disconnect();

    }, []);

    return (
        <div className={"experiment-body"}>
            {(step === 0) && <div className={"start-body"}>
                <div className={"split left"} style={{backgroundColor:emotionNumToColor(emotion1)}}>
                    <div className={"vertical-shift"}>
                        <h1>{emotionNumToString(emotion1)}</h1>
                        <p className={"huge-text"}>{emotionNumToIcon(emotion1)}</p>
                        <p className={"big-text"}><FontAwesomeIcon icon={faCaretSquareLeft}/></p>
                    </div>
                </div>
                <div className={"split right"} style={{backgroundColor:emotionNumToColor(emotion2)}}>
                    <div className={"vertical-shift"}>
                        <h1>{emotionNumToString(emotion2)}</h1>
                        <p className={"huge-text"}>{emotionNumToIcon(emotion2)}</p>
                        <p className={"big-text"}><FontAwesomeIcon icon={faCaretSquareRight}/></p>
                    </div>
                </div>
                <Button className={"startBtn"} size={"lg"} variant={"dark"}>Got it!</Button>
            </div>}
        </div>
    );
}

export default Experiment;
