import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Table
} from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
class ViewCollections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: []
        }
    }

    componentDidMount() {
        const collection = this.props.db.database().ref('collection');
        collection.on('value', (snapshot) => {
            console.log("snapshot value " + snapshot.val());
            let collections = snapshot.val();
            let newCollectionsState = [];
            for (let collection in collections) {
                console.log("id " + collection);
                console.log("name " + collections[collection].name);
                console.log("amount " + collections[collection].amount);
                console.log("date " + collections[collection].date);
                newCollectionsState.push({
                    id: collection,
                    name: collections[collection].name,
                    amount: collections[collection].amount,
                    date: collections[collection].date
                });
            }
            this.setState({
                collections: newCollectionsState
            });
        })
    }

    deleteCollection(collectionId) {


        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log("delete collection " + collectionId);
                        const collectionItemRef = this.props.db.database().ref(`/collection/${collectionId}`);
                        collectionItemRef.remove(function(error) {
                            if (error) {
                                alert("Failure!!!");
                            } else {
                                alert("Successful Deleted!!!");
                            }
                        });
                    }
                },
                {
                    label: 'No',
                    //onClick: () => alert('Click No')
                }
            ]
        })
    }

    render() {
        return (
            <div>

                <Table hover responsive className="table-outline mb-0 d-sm-table">
                    <thead className="thead-light">
                        <tr>
                            <th>Employee Name</th>
                            <th className="text-center">Amount</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.collections.map((collection) => {
                            return (

                                <tr>
                                    <td>
                                        <div>{collection.name}</div>
                                    </td>

                                    <td className="text-center">
                                        <div>Amount: {collection.amount}</div>
                                    </td>
                                    <td>
                                        <div>{collection.date}</div>

                                    </td>
                                    <td className="text-center" >
                                        <i className="fa fa-trash" onClick={() => this.deleteCollection(collection.id)} style={{ fontSize: 24 + 'px', color: '#000000' }}></i>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                {/* {this.state.collections.map((collection) => {
                                return (
                                
                                    <Row>
                                    <Col xs="12" sm="6" md="4">
                                        <Card className="text-white bg-primary text-center">
                                            <CardBody>
                                                <blockquote className="card-bodyquote">
                                                <h3>{collection.name}</h3>
                                                <p>Amount: {collection.amount}
                                                </p>
                                                <p>Date: {collection.date}
                                                </p>
                                                </blockquote>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                )
                            })}
                
                {<section className='display-item'>
                    <div className="wrapper">
                        <ul>
                            {this.state.collections.map((collection) => {
                                return (
                                    <li key={collection.id}>
                                        <h3>{collection.name}</h3>
                                        <p>Amount: {collection.amount}

                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                        </section>  */}
            </div>
        )
    }

}
export default ViewCollections;