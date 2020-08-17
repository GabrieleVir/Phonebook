import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { CreatePhonebook } from "./components/Phonebook/Phonebook.js";
import "./App.css";
import Flash from './components/Flash/flash';
import Bus from './utils/Bus';

window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));

class App extends Component {
    render() {
        return (
            <div className="App">
                <Flash />
                <div className="App-content">
                <Switch>
                    <Route exact path="/" component={CreatePhonebook} />
                </Switch>
        </div>
        </div>
    );
    }
}
export default App;