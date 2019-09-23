'use strict';

import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Form, Button, View,Container,Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea} from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';
// import { validationService } from "../Validation/Service";
import ValidationComponent from 'react-native-form-validator';


export default class SpecialRequests extends ValidationComponent  {
  constructor(props) {
    super(props);    
    this.state={
        colours:"Red, Green",
        specialInstructions:"special Instructions",
        deliveryInstructions:" delivery Instructions",
    };
    this.submit = this.submit.bind(this);
  }

   submit(formData) {
    // console.log("ok");
    // console.log("checking the submit button",this.state.deliveryInstructions);
     this.props.navigation.navigate("ReviewOrder",{special:this.state,formData:formData});
  }

  // validation(colours) {
  //   // console.log(colours);
  //   this.setState({colours:colours});
  //    this.validate({
  //     // name: {minlength:3, maxlength:7, required: true},
  //     // email: {email: true},
  //     // number: {numbers: true},
  //     // date: {date: 'YYYY-MM-DD'},
  //     colours: {required},
  //     specialInstructions: {required}
  //   });
  // }


  render(){

    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const formData = params ? params.formData : null;
    
    // console.log("Special Requests ",formData);

    return (
       <Container>
        <Header>
          <Left>
            <Button
              transparent
             onPress={()=>this.props.navigation.goBack()}           >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Concrete ASAP</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='person' />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.content}>
          <ScrollView>
            <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Special Requests</Text>
            
              <Text style={{marginTop:20, marginLeft:10, fontWeight:'bold'}}>Colours</Text>
              <Textarea ref="colours" style={{margin:10}} rowSpan={5} bordered placeholder="Please enter colours" 
                        onChangeText={(colours) => this.setState({colours})}
                        value={this.state.colours}/>
              {this.getErrorsInField("colours").map((errorMessage,index) => <Text key={index}>{errorMessage}</Text>)}
              <Text style={{marginLeft:10, fontSize:20}} onPress={ ()=> Linking.openURL('https://google.com') } >
                  Click Here To Open Google.
                  </Text>
              <Text style={{marginLeft:10, marginTop:20, fontWeight:'bold'}}>Special Instructions</Text>
               <Textarea ref="specialInstructions" style={{margin:10}} rowSpan={5} bordered placeholder="Please enter special instructions"
                      onChangeText={(specialInstructions) => this.setState({specialInstructions})}
                      value={this.state.specialInstructions}/> 
              {this.getErrorsInField("specialInstructions").map((errorMessage,index) => <Text key={index}>{errorMessage}</Text>)}
              <Text style={{marginLeft:10, marginTop:20, fontWeight:'bold'}}>Delivery Instructions</Text>
              <Textarea style={{margin:10}} rowSpan={5} bordered placeholder="Please enter delivery instructions"
                      onChangeText={(deliveryInstructions) => this.setState({deliveryInstructions})}
                      value={this.state.deliveryInstructions} /> 

              <View style={styles.registerButton}>
                            <TouchableOpacity onPress={()=>this.submit(formData)}>
                              <Text style = {styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                </View>

              
                

                
          </ScrollView>
        </Content>
      </Container>
    );
  }
}