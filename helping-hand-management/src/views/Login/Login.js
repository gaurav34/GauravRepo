import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';


class Login extends Component {

  constructor(props) {
  super(props);
  this.state= {
    userName: '',
    password:''
  }

  const isLogin = localStorage.getItem("isLogin");
  console.log("login.js login " + localStorage.getItem('isLogin'));
  if (isLogin === 'true') {
    console.log("if");
    this.props.history.push('/');
  } else {
    console.log("else");
    
  }
}

onUserNameChanged(e) {
  this.setState({ userName: e.target.value });
}

onPasswordChanged(e) {
   this.setState({ password: e.target.value });
}

onLoginClicked(e) {
  e.preventDefault();
  if (!this.state.userName) {
      alert("User Name is empty");
  } else if(!this.state.password) {
      alert("Password is empty");
  } else {
    if (this.state.userName ==='admin' && this.state.password ==='admin' ) {
      console.log(localStorage.getItem('isLogin'));
      localStorage.setItem('isLogin', 'true');
      this.props.history.push('/');
      alert("Successful Login!!!");
      console.log(localStorage.getItem('isLogin'));
    } else {
      alert("Invalid user name or password!!!");
    }
     this.setState({
        userName: '',
        password: ''
      });
  }
  
}

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.userName} name="username-input" onChange={(e) => this.onUserNameChanged(e)} placeholder="Username"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" value={this.state.password} name="password-input" onChange={(e) => this.onPasswordChanged(e)} placeholder="Password"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={(e) => this.onLoginClicked(e)} >Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
