import React, { useState } from "react";
import {
    Stack,Tabs, Tab  , Card , Button , Container , Spinner , Row , Col
} from "react-bootstrap";
import { getService , updateBookingStatus } from '../../../api/index'
import AddSlotForm from './AddSlotForm'
import DateTimePicker from 'react-datetime-picker';

class Appointments extends React.Component {
  constructor(props) {
    super(props);
 //   this.onSelectedService = this.onSelectedService.bind(this);
      this.state = {
      store : null,
      selectedId : "" , 
      formDate : Date(),
      formDuration : 10
    };
  
  }

  
  
  componentDidUpdate(prevProps, prevState) {
    
    if (prevProps.selectedServiceId !== this.props.selectedServiceId  ) {
      this.loadPage();
    }
}
  
loadPage(){
  // this.setState({
  //     store: null
  //   });
  getService(this.props.selectedServiceId).then(results =>{
    console.log(results)
  
    if(results){
    const store = results["data"];
    this.setState({
      store: store
    });
  }
  })
}

loadPageFromChild = (id) =>{
  // this.setState({
  //     store: null
  //   });
  getService(id).then(results =>{
    console.log(results)
  
    if(results){
    const store = results["data"];
    this.setState({
      store: store
    });
  }
  })
}

  
  bookingaction(id , status ){
    console.log("bookingaction" + status + id);
    updateBookingStatus(id , status).then(results =>{
      console.log(results)
      this.loadPage()
      // if(results){
      // const store = results["data"];
      // this.setState({
      //   store: store
      // });
   // }
    })
  }

      
  render() {
  //   <DateTimePicker
  //   onChange={onChange}
  //   value={value}
  // />
  console.log(this.props.selectedServiceId)

    if(this.state.store != null && this.state.store.slots ){

      if(this.state.store.slots.length == 0){

        return(
          <AddSlotForm value={this.props.selectedServiceId} onDone={this.loadPageFromChild}></AddSlotForm>
    
        )
      }

      console.log(this.state.store);
      const listItems = this.state.store.slots.map(({_id, startTime, duration, owner, booker, status, createdAt, updatedAt, __v}) =>
       

      <Card>
        <Card.Header as="h5">{ startTime } { duration }  </Card.Header>
        <Card.Body>
          <Card.Title> {  status != '' ?   status : "pending"}</Card.Title>
         
          { (booker !== null && status != '')  && 
          <Container>
          <Card.Text>{booker.username}</Card.Text>
          <Row>
              <Col> <Button variant="primary" onClick={() => this.bookingaction(_id , "confirmed")}>Confirm</Button></Col>
              <Col><Button variant="danger" onClick={() => this.bookingaction(_id , "")}>Reject</Button></Col>
            </Row>
          </Container>
          }
        </Card.Body>
      </Card>
  
    );
    return (
      <Stack gap={3}>
        <row>
        <AddSlotForm value={this.props.selectedServiceId} onDone={this.loadPageFromChild}></AddSlotForm>
        </row>
      {listItems}
   </Stack>
    );

 
  }
  else{
    return(
      <Stack gap={2} >
        <row>
        <AddSlotForm value={this.props.selectedServiceId} onDone={this.loadPageFromChild}></AddSlotForm>
        </row>
        <row>
        <Spinner animation="border" />
         </row>
      </Stack>
    )
  }

  }
}

export default Appointments;
