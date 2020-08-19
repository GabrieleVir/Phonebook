import React from "react";
import {Button, FormGroup, FormControl, ControlLabel, Glyphicon} from "react-bootstrap";
import API from "../../utils/API";
import {sanitizeString, arePhonebookInputsValid} from '../../utils/Utils'
import {Link} from "react-router-dom";

export class CreatePhonebookForm extends React.Component {
    state = {
        first_name: "",
        last_name: "",
        phonenumber: "",
    };

    send = async () => {
        let { first_name, last_name, phonenumber } = this.state;
        first_name = first_name ? sanitizeString(first_name.trim()) : '';
        last_name = last_name ? sanitizeString(last_name.trim()) : '';
        phonenumber = phonenumber ? phonenumber.trim() : '';
        if (arePhonebookInputsValid(first_name, last_name, phonenumber)) {
            API.create({ first_name, last_name, phonenumber })
                .then((response) => {
                    window.flash(response['text']);
                    this.props.history.push('/')
                }).catch(() => {
                    window.flash("The server responded with a 400 error", 'error');
                });
        }
    };
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    render() {
        const { first_name, last_name, phonenumber } = this.state;
        return (
            <div className="Phonebook">
                <Link to="/"><Glyphicon glyph="glyphicon glyphicon-arrow-left" /> Back</Link>
                <FormGroup controlId="first_name" bsSize="large">
                    <ControlLabel>First name</ControlLabel>
                    <FormControl
                    autoFocus
                    placeholder="Ex:John"
                    type="text"
                    value={first_name}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="last_name" bsSize="large">
                    <ControlLabel>Last name</ControlLabel>
                    <FormControl
                        placeholder="Ex:Smith"
                        value={last_name}
                        onChange={this.handleChange}
                        type="text"
                    />
                </FormGroup>
                <FormGroup controlId="phonenumber" bsSize="large">
                    <ControlLabel>Phonenumber</ControlLabel>
                    <FormControl
                        placeholder="Ex:+32 03 020202"
                        value={phonenumber}
                        onChange={this.handleChange}
                        type="text"
                    />
                </FormGroup>
                <Button onClick={this.send} block bsSize="large" type="submit">
                    Add
                </Button>
            </div>
        );
    }
}