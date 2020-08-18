import React from "react";
import {Link} from "react-router-dom";

export class PhonebookItem extends React.Component {
    render() {
        const phonebook = this.props.phonebook;

        return (
            <tr className="PhonebookItem">
                <td>{phonebook.first_name}</td>
                <td>{phonebook.last_name}</td>
                <td>{phonebook.phonenumber}</td>
                <td><Link to="/edit">Edit</Link></td>
            </tr>
        );
    }
}