import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";
import {sanitizeString, arePhonebookInputsValid} from '../../utils/Utils'
import {Link} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

export class UpdatePhonebookForm extends React.Component {
    state = {
        routeId: this.props.match.params.id,
        first_name: "",
        last_name: "",
        phonenumber: "",
    };

    update = async () => {
        let { first_name, last_name, phonenumber } = this.state;
        first_name = first_name ? sanitizeString(first_name.trim()) : '';
        last_name = last_name ? sanitizeString(last_name.trim()) : '';
        phonenumber = phonenumber ? phonenumber.trim() : '';
        if (arePhonebookInputsValid(first_name, last_name, phonenumber)) {
            API.update(this.state.routeId, {first_name, last_name, phonenumber})
                .then((response) => {
                    window.flash(response.data['text']);
                    this.props.history.push('/')
                }).catch(() => {
                window.flash("The server responded with a 400 error", 'error');
            });
        }
    };

    componentDidMount() {
        API.fetch(this.state.routeId)
            .then(async (response) => {
                await this.setState({first_name: response.data.phonebook.first_name})
                await this.setState({last_name: response.data.phonebook.last_name})
                await this.setState({phonenumber: response.data.phonebook.phonenumber})
            }).catch(() => {
                window.flash('Error on fetching the phonebook entry', 'error');
                this.props.history.push('/');
            });
    }

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
                        type="text"
                        value={first_name}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="last_name" bssize="large">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        value={last_name}
                        onChange={this.handleChange}
                        type="text"
                    />
                </Form.Group>
                <Form.Group controlId="phonenumber" bssize="large">
                    <Form.Label>Phonenumber</Form.Label>
                    <Form.Control
                        value={phonenumber}
                        onChange={this.handleChange}
                        type="text"
                    />
                </Form.Group>
                <Button onClick={this.update} block bssize="large" type="submit">
                    Update
                </Button>
            </div>
        );
    }
}