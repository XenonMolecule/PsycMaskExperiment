import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from './pages/Home.js';
import LearnMore from "./pages/LearnMore";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/instructions">
                    <Home />
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
