import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Grid,Col } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../../styles.js';

import { connect } from 'react-redux';
import { actions, States } from '../../../../store';



class ReviewOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  nextActions(formData,special){
     if(formData.message_required!=="false"){
          this.props.navigation.navigate("ReviewInstructions",{formData:formData,special:special})
     }
     else{
       this.submitForm(formData);
     }

  }

  submitForm(formData){
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
            collection.colours="null",
            collection.specialInstructions="null",
            collection.deliveryInstructions="null",
        this.props.submit(collection);
  }

  render(){

    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const formData = params ? params.formData : null;
    const special = params ? params.special : null;
    console.log("Checking data",formData);
    // console.log("Review Order",special);

    return (
       <Container>
        <Header>
          <Left>
            <Button
              transparent
             onPress={()=>this.props.navigation.navigate("PlaceOrder")}
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
          <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Review Order</Text>
          <Grid>
            <Col style={{marginLeft:15, marginTop:15}}>
              <Text>Suburb / Post Code</Text>
              <Text>Type</Text>
              <Text>MPA</Text>
              <Text>AGG</Text>
              <Text>Slump</Text>
              <Text>Addatives</Text>
              <Text>Placement Type</Text>
              <Text>Quantity</Text>
              <Text>Preferred Time 1</Text>
              <Text>Preferred Time 2</Text>
              <Text>Preferred Time 3</Text>
              <Text>Date</Text>
              <Text>Urgency</Text>
              <Text>On Site / Call</Text>
              <Text style={{fontSize:20, fontWeight:'bold', color: 'red'}}>Message Required:</Text>
            </Col>
            <Col style={{marginTop:15}}>
              <Text >{formData.suburb}</Text>
              <Text >{formData.type}</Text>
              <Text>{formData.mpa}</Text>
              <Text>{formData.agg}</Text>
              <Text>{formData.slu}</Text>
              <Text>{formData.acc}</Text>
              <Text>{formData.placement_types}</Text>
              <Text>{formData.quantity}</Text>
              <Text>{formData.time1}</Text>
              <Text>{formData.time2}</Text>
              <Text>{formData.time3}</Text>
              <Text >{}</Text>
              <Text >{formData.urgency}</Text>
              <Text >{formData.site_call}</Text>
              <Text  style={{fontSize:20, fontWeight:'bold', color: 'red'}}>{formData.message_required=="false"?"No":"Yes"}</Text>
            </Col>
          </Grid>
            <View style={styles.registerButton}>
              <TouchableOpacity onPress={()=>this.nextActions(formData,special)}>
                    <Text style = {styles.buttonText}>{formData.message_required=="false"?"Finalize":"Next"}</Text>
              </TouchableOpacity>
            </View>
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


export default connect(mapStateToProps,mapDispatchToProps)(ReviewOrder);
