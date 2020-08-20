import React from "react";
import API from "../../utils/API";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import {FaPlusCircle, FaSearch} from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {PhonebookItem} from "../PhonebookItem/phonebookItem";
import Spinner from "react-bootstrap/Spinner";

export class PhonebookList extends React.Component {
    state = {
        searchTerm: "",
        phonebooks: [],
    };

    componentDidMount = async () => {
        await API.fetchBySearch("")
            .then((response) => {
                this.setState({phonebooks: response.data.phonebooks})
            }).catch(() => {
                window.flash("There has been a problem when fetching the phonebooks", "error");
            });
    };

    search = () => {
        const searchTerm = this.state.searchTerm;
        API.fetchBySearch(searchTerm)
            .then((response) => {
                this.setState({phonebooks: response.data.phonebooks});
            }).catch(async () => {
                this.setState({phonebooks: [{noEntry: true}]});
            });
    };
    handleKeyPress = (event) => {
        const searchTerm = this.state.searchTerm;
        this.search(searchTerm);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    render() {
        const phonebooks = this.state.phonebooks;
        const searchTerm = this.state.searchTerm;

        return (
            <div className="PhonebookList">
            <Container fluid>
                <Row>
                    <Col md={3} >
                        <Form.Group controlId="searchTerm">
                            <Form.Control
                                autoFocus
                                placeholder="Type your search here"
                                type="text"
                                value={searchTerm}
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={9}>
                        <Row>
                             <Col md={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                 <div className="float-left">
                                     <Button onClick={this.search} type="submit" variant="outline-success">
                                         <FaSearch />Search
                                     </Button>
                                 </div>
                             </Col>
                            <Col md={{span: 6, offset: 3}} style={{ paddingLeft: 0, paddingRight: 0, }}>
                                <div className="float-right">
                                     <Link to="/create">
                                         <Button variant="primary"><FaPlusCircle /></Button>
                                     </Link>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
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
                                <td colSpan={4}><Spinner animation="border" variant="primary"/></td>
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