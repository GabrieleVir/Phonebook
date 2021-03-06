import React from "react";
import {Link} from "react-router-dom";

export class PhonebookItem extends React.Component {

    render() {
        const phonebook = this.props.phonebook;

        if (phonebook.noEntry) {
            return (
                <tr className="PhonebookItem">
                    <td colSpan={4}>
                        No entry found
                    </td>
                </tr>
            );
        } else {
            return (
                <tr className="PhonebookItem">
                    <td>{phonebook.first_name}</td>
                    <td>{phonebook.last_name}</td>
                    <td>{phonebook.phonenumber}</td>
                    <td><Link to={`/edit/${phonebook._id}`}>Edit</Link></td>
                </tr>
            );
        }
    }
}