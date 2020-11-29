import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from './pages/Home.js';
import LearnMore from "./pages/LearnMore";
import Instructions from "./pages/Instructions";
import Experiment from "./pages/Experiment";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/experiment">
                    <Experiment />
                </Route>
                <Route path="/instructions">
                    <Instructions />
                </Route>
                <Route path="/learn">
                    <LearnMore />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
