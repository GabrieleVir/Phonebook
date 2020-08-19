import React from "react";
import {Button, FormGroup, FormControl, ControlLabel, Glyphicon} from "react-bootstrap";
import API from "../../utils/API";
import {sanitizeString, arePhonebookInputsValid} from '../../utils/Utils'
import {Link} from "react-router-dom";

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
                    window.flash(response['text']);
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
                <Link to="/"><Glyphicon glyph="glyphicon glyphicon-arrow-left" /> Back</Link>
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
                <Button onClick={this.update} block bsSize="large" type="submit">
                    Update
                </Button>
            </div>
        );
    }
}