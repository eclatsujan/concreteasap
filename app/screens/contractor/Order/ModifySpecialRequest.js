import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Form, Button, View,Container,Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea} from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';
import { validationService } from "../Validation/Service";


export default class ModifySpecialRequests extends React.Component {
  constructor(props) {
    super(props);    
    this.state={
      inputs:{
            colours:{
                       type: "generic",
                        value: "No"
          },
            specialInstructions:{
                       type: "generic",
                        value: ""
          },
          deliveryInstructions:"",

      }
    };

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.submit = this.submit.bind(this);
  }

   submit(formData) {
    console.log("checking the submit button");
     this.getFormValidation();
     if(this.state.inputs.colours.value === "No" || this.state.inputs.specialInstructions.value !== "" ){
     this.props.navigation.navigate("ReviewOrder",{special:this.state.inputs,formData:formData});
   }
  }

  renderError(id) {
    const { inputs } = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={{fontSize:18, color: 'red'}}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }


  render(){

    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const formData = params ? params.formData : null;

    return (
       <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Icon name='menu' />
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
              <TextInput
                      multiline = {true}  
                      numberOfLines = {7}  
                      onChangeText={(value) => {this.onInputChange({ id: "colours", value:value }); }}   
                      value={this.state.colours}  
                      style={{fontSize: 20,  borderWidth: 1, borderColor: '#d9d9d9', margin:10}} /> 

              <Text>{this.renderError("colours")}</Text>

              <Text style={{marginLeft:10, fontSize:20}} onPress={ ()=> Linking.openURL('https://google.com') } >
                  Click Here To Open Google.
                  </Text>
              <Text style={{marginLeft:10, marginTop:20, fontWeight:'bold'}}>Special Instructions</Text>
              <TextInput  
                      multiline = {true}  
                      numberOfLines = {7}  
                      onChangeText={(value) => {this.onInputChange({ id: "specialInstructions", value:value }); }}  
                      value={this.state.specialInstructions}  
                      style={{fontSize: 20,  borderWidth: 1, borderColor: '#d9d9d9', margin:10}}   /> 

                  <Text>{this.renderError("specialInstructions")}</Text>
              <Text style={{marginLeft:10, marginTop:20, fontWeight:'bold'}}>Delivery Instructions</Text>
              <TextInput  
                      multiline = {true}  
                      numberOfLines = {7}  
                      onChangeText={(deliveryInstructions) => this.setState({deliveryInstructions})}
                      value={this.state.deliveryInstructions} 
                      style={{fontSize: 20,  borderWidth: 1, borderColor: '#d9d9d9', margin:10}}   /> 


              <View style={styles.registerButton}>
                            <TouchableOpacity onPress={()=>this.submit(formData)}>
                              <Text style = {styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                </View>

              
                

                
          </ScrollView>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}