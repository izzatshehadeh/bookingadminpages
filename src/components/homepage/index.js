import React, { useState } from "react";
import {
  Container,
  Row,
  Form,
  Button,
  Alert,
  InputGroup,
  Spinner,
  CardColumns,
  Card,
  Col
} from "react-bootstrap";
import  Navigation  from './components/navigation'
import Appointments from './components/apointments'
import { getServices } from "../../api";
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.selectedService = this.selectedService.bind(this);
    this.state = {
      isLoading: false ,
      noStoresFound : true ,
      stores : [],
      selectedServiceId : ""
    };
  }

  selectedService(e){
    console.log(e);
    this.setState({
      selectedServiceId : e
    })
  }
  
  render() {
    return (
      <Container fluid="md">
         <Row
         
         ></Row>
    <Row>
      <Col xs={2}>
      <Navigation onChange={this.selectedService}></Navigation>
  
      </Col>
      <Col xs={10}>
    
   <Appointments selectedServiceId={this.state.selectedServiceId}></Appointments>
      </Col>
    </Row>
</Container>
      );
  }
}

export default Homepage;
