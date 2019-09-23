import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';

import { connect } from 'react-redux';
import { actions, States } from '../../../../store';

import {styles} from '../../styles.js';


class ReviewInstructions extends React.Component {
  constructor(props) {
    super(props);    
  }

  submitForm(formData,special){
    let collection={}
    collection.suburb=formData.suburb,
    collection.type=formData.type,
    collection.mpa=formData.mpa,
    collection.agg=formData.agg,
    collection.slump=formData.slu,
    collection.acc=formData.acc,
    collection.placement_type=formData.placement_types,
    collection.quantity=formData.quantity,
    collection.delivery_date=formData.chosenDate,
    collection.time_preference1=formData.time1,
    collection.time_preference2=formData.time2,
    collection.time_preference3=formData.time3,
    collection.time_deliveries=formData.time_difference_deliveries,
    collection.urgency=formData.urgency,
    collection.message_required=formData.message_required,
    collection.preference=formData.site_call,
    collection.colours=special.colours,
    collection.specialInstructions=special.specialInstructions,
    collection.deliveryInstructions=special.deliveryInstructions,
    this.props.submit(collection);
    
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.order.isOrderComplete){
  //    this.props.navigation.navigate("ViewOrderHome",{message:"Order Successfully"});
  //   }
  // }



  render(){

/* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const formData = params ? params.formData : null;
    const special = params ? params.special : null;
    // console.log("Checking data",formData);
    // console.log("Checking Checking",special);

    return (
       <Container>
        <Header>
          <Left>
            <Button
              transparent
             onPress={()=>this.props.navigation.navigate("ReviewOrder")}
            >
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
          <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Review Instructions</Text>
          <Form>
          <Text style={{marginTop:20, marginLeft:10}}>Colours</Text>
          <Textarea style={{margin:10}} rowSpan={5} bordered placeholder={special.colours} disabled/>
          <Text style={{marginLeft:10}}>Special Instructions</Text>
          <Textarea style={{margin:10}} rowSpan={5} bordered placeholder={special.specialInstructions} disabled/>
          <Text style={{marginLeft:10}}>Delivery Instructions</Text>
          <Textarea style={{margin:10}} rowSpan={5} bordered placeholder={special.deliveryInstructions} disabled/>
          <View style={styles.registerButton}>
                        <TouchableOpacity onPress={(e)=>{this.submitForm(formData, special)}}>
                          <Text style = {styles.buttonText}>Finalise</Text>
                        </TouchableOpacity>
            </View>
          </Form>
              

              
            </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (collection) => {
      console.log(actions);
      return dispatch(actions.order.createOrder(collection))
    },
  }
}

const mapStateToProps = (state) => {
  const {order}=state;
  return {order};
}


export default connect(mapStateToProps,mapDispatchToProps)(ReviewInstructions);