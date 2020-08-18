import React from "react";
import API from "../../utils/API";
import {Link} from "react-router-dom";
import {PhonebookItem} from "../PhonebookItem/phonebookItem";
import { Table } from "react-bootstrap";


export class PhonebookList extends React.Component {
    state = {
        search: "",
        phonebooks: [],
    };

    componentDidMount = async () => {
        const results = await API.fetchBySearch("");
        if (results.status === 200) {
            await this.setState({phonebooks: results.data.phonebooks.reverse()})
        }
    }

    recieve = async () => {
        const { search } = this.state.search;
        try {
            const results = await API.fetchBySearch("");
            if (results.status === 200) {
                this.setState({phonebooks: results.data.phonebooks});
            }
        } catch (error) {
            window.flash("No entry found", 'error');
        }
    };
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    render() {
        const phonebooks = this.state.phonebooks;

        return (
            <div className="PhonebookList">
                <Link to="/create">Click to create an entry</Link>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Phone number</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    phonebooks.length > 0 ? (
                        phonebooks.map((_phonebook, _index) => {
                            return (
                                <PhonebookItem key={_index} phonebook={_phonebook}/>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={4}>No entry found</td>
                        </tr>
                    )
                }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default PhonebookList;