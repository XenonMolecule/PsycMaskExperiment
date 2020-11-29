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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import socketIOClient from "socket.io-client";
import FaceImg from "./FaceImg";
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

function ExperimentComponent(props) {
    const [step, setStep] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [timeDiff, setTimeDiff] = useState(0);

    const {emotion1, emotion2, experiment} = props;

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            // setResponse(data);
        });

        // CLEAN UP THE EFFECT
        return () => socket.disconnect();

    }, []);

    useEffect(() => {
        const curr_date = new Date();
        setTimeDiff(curr_date - startTime);
        const interval = setInterval(() => {
            const d = new Date();
            setTimeDiff(d - startTime);
        }, 10);
        return () => {clearInterval(interval)}
    }, [startTime]);

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
                <Button className={"startBtn"} size={"lg"} variant={"dark"} onClick={()=> {
                    setStep(1);
                    setStartTime(new Date());
                    setTimeout(() => {
                        setStep(2);
                        setStartTime(new Date());
                    }, 5000);
                }}>Got it!</Button>
            </div>}
            {(step === 1) && <div className={"start-body"}>
                <p style={{marginTop:"25vh"}} className={"huge-text"}>{Math.ceil((5000 - timeDiff) / 1000)}</p>
            </div> }
            {(step >= 2) && <div className={"start-body vertical-center"}>
                <Container>
                    <h1>Use the arrow keys!</h1>
                    <Row className={"justify-content-center"}>
                        <Card style={{width:"75%", textAlign:"center"}}>
                            <Row className={"justify-content-center"}>
                                {window.innerWidth > 773 && <Col style={{backgroundColor:emotionNumToColor(emotion1)}}>
                                    <p
                                        className={"big-text vertical-center"}
                                        style={{transform:"translate(0, -25%)"}}
                                    ><FontAwesomeIcon icon={faCaretSquareLeft}/></p>
                                    {window.innerWidth > 990 && <h1 style={{transform:"translate(0,25px)"}}>{emotionNumToString(emotion1)}</h1>}
                                </Col>}
                                <Col>
                                    <FaceImg emotion={emotionNumToString(experiment[step - 2][0]).toLowerCase()}
                                             num={experiment[step - 2][1]}
                                             mask={experiment[step - 2][2]}
                                             width={"100%"}
                                    />
                                </Col>
                                {window.innerWidth > 773 && <Col style={{backgroundColor:emotionNumToColor(emotion2)}}>
                                    <p
                                        className={"big-text vertical-center"}
                                        style={{transform:"translate(0, -25%)"}}
                                    ><FontAwesomeIcon icon={faCaretSquareRight}/></p>
                                    {window.innerWidth > 990 && <h1 style={{transform:"translate(0,25px)"}}>{emotionNumToString(emotion2)}</h1>}
                                </Col>}
                            </Row>
                        </Card>
                    </Row>
                    <h1>{(Math.round(timeDiff / 10) / 100).toFixed(2)}</h1>
                </Container>
            </div>}
        </div>
    );
}

export default ExperimentComponent;
