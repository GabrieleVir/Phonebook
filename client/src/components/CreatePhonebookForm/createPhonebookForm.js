import React from "react";
import {FaArrowLeft} from "react-icons/fa"
import {Form, Button} from "react-bootstrap";
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
                    window.flash(response.data['text']);
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
                <Link to="/"><FaArrowLeft /> Back</Link>
                <Form.Group controlId="first_name" bssize="large">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                    autoFocus
                    placeholder="Ex:John"
                    type="text"
                    value={first_name}
                    onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="last_name" bssize="large">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        placeholder="Ex:Smith"
                        value={last_name}
                        onChange={this.handleChange}
                        type="text"
                    />
                </Form.Group>
                <Form.Group controlId="phonenumber" bssize="large">
                    <Form.Label>Phonenumber</Form.Label>
                    <Form.Control
                        placeholder="Ex:+32 03 020202"
                        value={phonenumber}
                        onChange={this.handleChange}
                        type="text"
                    />
                </Form.Group>
                <Button onClick={this.send} block bssize="large" type="submit">
                    Add
                </Button>
            </div>
        );
    }
}