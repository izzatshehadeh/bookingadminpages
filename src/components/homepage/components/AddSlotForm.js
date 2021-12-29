import React, { useState } from "react";
import {
    Stack,Tabs, Tab  , Card , Button , Container , Spinner , Row , Col
} from "react-bootstrap";
import { getService , updateBookingStatus , createSlot} from '../../../api/index'

import DateTimePicker from 'react-datetime-picker';

class AddSlotForm extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
      formDate : new  Date(),
      formDuration : 10
    };
    console.log(this.props)
  }

  
  
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props)
    // if (prevProps.selectedServiceId !== this.props.selectedServiceId  ) {
    //   this.loadPage();
    // }
}   
  


  
  bookingaction(){
   
    createSlot(this.props.value , this.state.formDate , this.state.formDuration).then(results =>{
      console.log(results)
      this.props.onDone(this.props.value)
    })
  }
      
  datechange ( val){

    console.log(val);
    this.setState({
        formDate : val
      })
  }
  durationChange ( val){

  //  console.log(val);
    this.setState({
        formDuration : val
      })
  }
  render() {

    return (<Card>
    <Card.Header as="h5"> Add Slot   </Card.Header>
    <Card.Body>
     
      <Row>
          <Col> 
          <DateTimePicker
            onChange={ (val) => this.datechange(val)}
            value={this.state.formDate}
          />
          </Col>

          <Col> 
          <input type="text" value={this.state.formDuration} 
          onChange={ (val) => this.durationChange(val.target.value)} type="number" />
          </Col>
          </Row>
          <Row>
          </Row>
          <Row>
          <Col><Button variant="danger" onClick={() =>  this.bookingaction()}>Add</Button></Col>
        </Row>
    
      
    </Card.Body>
  </Card>)
  }
}

export default AddSlotForm;
