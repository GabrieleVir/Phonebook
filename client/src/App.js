import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { CreatePhonebook } from "./components/Phonebook/phonebook.js";
import PhonebookList from "./components/PhonebookList/phonebookList.js";
import "./App.css";
import Flash from './components/Flash/flash';
import Bus from './utils/Bus';
import API from "./utils/API";

window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));

class App extends Component {
    constructor() {
        super();
        this.state = {
            phonebooks: []
        };
    }

    render() {
        return (
            <div className="App">
                <Flash />
                <div className="App-content">
                    <Switch>
                        <Route exact path="/" component={() => <PhonebookList />} />
                        <Route exact path="/create" component={CreatePhonebook} />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default App;