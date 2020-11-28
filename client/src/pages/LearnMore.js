import React from 'react';
import Navigation from "../components/Navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

function LearnMore() {
    return(
        <>
            <Navigation/>
            <Jumbotron>
                <Container style={{"textAlign":"center"}}>
                    <h3>Who we are</h3>
                    <p>
                        We're a group of two students in PSYC1101 at Georgia Tech working on our final project for the course.
                    </p>
                    <br/>
                    <h3>What we're doing</h3>
                    <p>
                        Our final project had to be relevant to current events in 2020 and explore some area of psychology.  We
                        decided to run an experiment where we would show images of faces with and without the mouth and nose
                        obstructed in order to simulate the person wearing a mask.  Then we would record how quickly the participant
                        could identify the emotion of the person presented in the image (and if the classification was correct).
                    </p>
                    <p>
                        We are attempting to answer our guiding question "Do masks make it more difficult to recognize facial expressions?"
                    </p>
                    <br/>
                    <h3>How'd we make this?</h3>
                    <p>
                        I'm so glad you asked (or were at least interested enough to keep reading this part) :)
                    </p>
                    <p>
                        This site was built with React for the frontend and Express with Node for the backend.  I definitely could've
                        just done POST requests to send the data about how long it took to classify the faces, but I already set up
                        Socket.IO so I'm probably just gonna use that lol.  Definitely wasn't necessary, but now I guess we could
                        turn this into a multiplayer face classification racing game with multidirectional communication so that's cool.
                    </p>
                    <p>
                        For storing all the data I'm gonna use SQL.  I've never used it before so wish me luck, but it just seems perfect
                        for storing data that should go in like a spreadsheet.  For data analysis I'm definitely just gonna export to a csv lol.
                    </p>
                    <p>
                        You probably figured this out from the url already, but I'm gonna host this with heroku I think.  They have a
                        pretty simple SQL hosting integration for free from what I can tell so I can just host the content server and database
                        on the same server.
                    </p>
                    <p>
                        If you're still reading I commend you for your interest in the nuts and bolts of this site.  Check it out on github :)
                    </p>
                    <h1>
                        <a href={"https://github.com/XenonMolecule/PsycMaskExperiment"} style={{"color":"black"}}>
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </h1>
                </Container>
            </Jumbotron>
        </>
    );
}

export default LearnMore;
