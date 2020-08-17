import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";

export class CreatePhonebook extends React.Component {
    state = {
        first_name: "",
        last_name: "",
        phonenumber: ""
    };
    send = async () => {
        const { first_name, last_name, phonenumber } = this.state;
        if (!first_name || first_name.length === 0 || !last_name || last_name.length === 0) {
            window.flash("First name or last name empty, please insert a first name and last name", 'error');
            return ;
        }
        let regex = /^[+][\d]{2}[ ][\d]{2}[ ][\d]{6,}/g;
        if (!phonenumber || !phonenumber.match(regex)) {
            window.flash("The format of the phonenumber is not respected: It has to start with the character '+' " +
                "followed by 2 digits then a space, 2 digits, a final space and at least 6 digits. Ex:+32 98 23232d32", 'error');
            return ;
        }
        try {
            const { data } = await API.create({ first_name, last_name, phonenumber });
            window.flash(data['text']);
        } catch (error) {
            window.flash("The phonebook already exists", 'error');
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
                <FormGroup controlId="first_name" bsSize="large">
                    <ControlLabel>First name</ControlLabel>
                    <FormControl
                    autoFocus
                    type="text"
                    value={first_name}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="last_name" bsSize="large">
                    <ControlLabel>Last name</ControlLabel>
                    <FormControl
                        value={last_name}
                        onChange={this.handleChange}
                        type="text"
                    />
                </FormGroup>
                <FormGroup controlId="phonenumber" bsSize="large">
                    <ControlLabel>Phonenumber</ControlLabel>
                    <FormControl
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