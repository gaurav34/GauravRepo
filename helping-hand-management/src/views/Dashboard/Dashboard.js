import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state={
      employees:[],
      collections:[],
      totalCollection:0,
      totalExpanditure:0,
      currentBalance:0,
      totalEmployee:0
    };
  }

  componentDidMount() {
    const employee = this.props.db.database().ref('employee');
    employee.on('value', (snapshot) => {
        let employees = snapshot.val();
        let newEmployeesState = [];
        for (let employee in employees) {
            newEmployeesState.push({
                id: employee,
                name: employees[employee].name,
                empid: employees[employee].id,
                designation: employees[employee].designation,
                dob: employees[employee].dob,
                bloodgroup: employees[employee].bloodgroup
            });
        }
        let totalEmployee = newEmployeesState.length;
        this.setState({
            employees: newEmployeesState,
            totalEmployee : newEmployeesState.length
        });
    })
    let totalExpanditure = 0;
    let totalCollection = 0;
    const collection = this.props.db.database().ref('collection');
        collection.on('value', (snapshot) => {
            let collections = snapshot.val();
            let newCollectionsState = [];
            
            for (let collection in collections) {
                newCollectionsState.push({
                    id: collection,
                    name: collections[collection].name,
                    amount: collections[collection].amount,
                    date: collections[collection].date
                });
                totalCollection = totalCollection + parseFloat(collections[collection].amount);
            }
            console.log("total collection " + totalCollection);
            this.setState({
                collections: newCollectionsState,
                totalCollection: totalCollection
            });
        })

        const expenditureRef = this.props.db.database().ref('expenditure');
        expenditureRef.on('value', (snapshot) => {
            let expenditures = snapshot.val();
            
            let newexpendituresState = [];
            for (let expenditure in expenditures) {
                newexpendituresState.push({
                    id: expenditure,
                    name: expenditures[expenditure].name,
                    amount: expenditures[expenditure].amount,
                    date: expenditures[expenditure].date,
                    description: expenditures[expenditure].description
                    
                });
                totalExpanditure = totalExpanditure + parseFloat(expenditures[expenditure].amount);
            }
            let currentBalance = totalCollection - totalExpanditure;
            this.setState({currentBalance: currentBalance});
            this.setState({
                expenditures: newexpendituresState,
                totalExpanditure: totalExpanditure
            });
        })
}

  render() {
    return (
      <div className="animated fadeIn">
        Innodeed Resource Management

        <Row>
          <Col xs="12" sm="6" lg="3" >
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.state.totalEmployee}</h4>
                <p>Total Employee</p>
              </CardBody>
            </Card>
          </Col>
          
          <Col xs="12" sm="6" lg="3" >
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.state.totalCollection}</h4>
                <p>Total Collection</p>
              </CardBody>
            </Card>
          </Col>


          <Col xs="12" sm="6" lg="3" >
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.state.totalExpanditure}</h4>
                <p>Total Expenditure</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3" >
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.state.currentBalance}</h4>
                <p>Current Balance</p>
              </CardBody>
            </Card>
          </Col>
          </Row>
      </div>
    )
  }
}

export default Dashboard;
