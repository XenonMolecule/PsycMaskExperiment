import React from 'react';
import Navigation from "../components/Navigation";

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function Instructions() {
    return (
        <>
            <Navigation/>
            <Jumbotron>
                <Container style={{textAlign:"center"}}>
                    <h3>Instructions</h3>
                    <p>
                        We're going to give you two emotions (ie. Happy and Angry) and an associated direction for each.
                    </p>
                    <p>
                        For example it might be Happy = Left; Angry = Right.
                    </p>
                    <p>
                        We'll then show you a series of images and you tap the <strong>arrow key</strong> associated
                        with the emotion shown. Try to classify the faces <strong>as quickly as you can.</strong>
                    </p>
                    <p>
                        After a little bit we'll switch up the emotions or the directions.
                    </p>
                    <p>
                        Participate for as long as you want.  There is no end to the experiment.  Thanks for your help!!
                    </p>
                    <p>
                        <Button as={Link} to="/experiment" variant="primary" size="lg">Let's Go!</Button>
                    </p>
                </Container>
            </Jumbotron>
        </>
    );
}

export default Instructions;
