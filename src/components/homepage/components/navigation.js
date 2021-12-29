import React, { useState } from "react";
import {
    Stack,Button , ListGroup
} from "react-bootstrap";
import { getServices } from '../../../api/index'
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectedService = this.onSelectedService.bind(this);
      this.state = {
      stores : [],
      selectedId : ""
    };

  }
 
  componentDidMount() {
    getServices().then(results =>{
      const stores = results["data"];
      this.setState({
        stores: stores
      });
    })
  }

  onSelectedService(id){
    console.log(id);  
    this.props.onChange(id );
   // this.selectedService(id);
 //   this.props.selectedService(id);
    }
 
      
  render() {
    return (
     

        <ListGroup  >
            {this.state.stores.map((store, idx) => {
              const {
                _id,
                nameEn,
                imageURL,
                descriptionEn,
              } = store; 
              return (
                <ListGroup.Item  key={`ss-${_id}`}  action onClick={() => this.onSelectedService(_id)}>
                {nameEn}
              </ListGroup.Item>
                 
              );
            })}
          </ListGroup>
    );
  }
}

export default Navigation;
