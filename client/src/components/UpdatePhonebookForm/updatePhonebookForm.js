import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import {sanitizeString} from '../../utils/utils'

export class UpdatePhonebookForm extends React.Component {
    state = {
        first_name: "",
        last_name: "",
        phonenumber: "",
    };

    update = async () => {
        let { first_name, last_name, phonenumber } = this.state;
        first_name = first_name ? sanitizeString(first_name.trim()) : '';
        last_name = last_name ? sanitizeString(last_name.trim()) : '';
        phonenumber = phonenumber ? phonenumber.trim() : '';
        if (first_name.length === 0 || last_name.length === 0) {
            window.flash("First name or last name empty, please insert a first name and last name", 'error');
            return ;
        }
        let regex = /^[+][\d]{2}[ ][\d]{2}[ ][\d]{6,}/g;
        if (!phonenumber.match(regex)) {
            window.flash("The format of the phonenumber is not respected: It has to start with the character '+' " +
                "followed by 2 digits then a space, 2 digits, a final space and at least 6 digits. Ex:+32 98 23232d32", 'error');
            return ;
        }
        try {
            const { data } = await API.update({first_name, last_name, phonenumber});
            window.flash(data['text']);
            this.props.history.push('/')
        } catch (error) {
            window.flash("The server responded with a 400 error", 'error');
        }
    };

    componentDidMount() {
        const handle = this.props.match.params;
        API.fetch(handle.id)
            .then((phonebook) => {
                this.setState(() => ({ phonebook }))
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    render() {
        const phonebook = this.state;

        return (
            <div className="Phonebook">
                <FormGroup controlId="first_name" bsSize="large">
                    <ControlLabel>First name</ControlLabel>
                    <FormControl
                        autoFocus
                        placeholder="Ex:John"
                        type="text"
                        value={phonebook.first_name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="last_name" bsSize="large">
                    <ControlLabel>Last name</ControlLabel>
                    <FormControl
                        placeholder="Ex:Smith"
                        value={phonebook.last_name}
                        onChange={this.handleChange}
                        type="text"
                    />
                </FormGroup>
                <FormGroup controlId="phonenumber" bsSize="large">
                    <ControlLabel>Phonenumber</ControlLabel>
                    <FormControl
                        value={phonebook.phonenumber}
                        onChange={this.handleChange}
                        type="text"
                    />
                </FormGroup>
                <Button onClick={this.update} block bsSize="large" type="submit">
                    Update
                </Button>
            </div>
        );
    }
}