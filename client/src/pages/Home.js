import React from 'react';

import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

function Home() {
    return (
        <>
            <Navigation/>
            <Jumbotron style={{"textAlign":"center"}}>
                <h1>PSYC 1101 Masks and Emotions Experiment</h1>
                <p>
                    Thanks for taking the time to check out our website for our final project for PSYC1101!
                </p>
                <p> If you're interested in participating in the study you can click "Get started" below, and participate
                    for as long as you want.  There is no time commitment - we continuously collect responses, so you can
                    participate for as few as 30 seconds to as long as 10 minutes (or more, but like seriously how long
                    can you classify emotions before you get bored?)
                </p>
                <p>
                    If you're interested in learning more about this project you can also click "Learn more"
                </p>
                <p>
                    <Button as={Link} to="/instructions" variant="primary" size="lg">Get started</Button>
                </p>
                <p>
                    <Button as={Link} to="/learn" variant="link" size="lg">Learn more</Button>
                </p>
            </Jumbotron>
        </>
    );
}

export default Home;
