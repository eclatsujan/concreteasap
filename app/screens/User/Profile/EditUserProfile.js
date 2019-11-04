import * as React from 'react';
import { TextInput, StyleSheet, Label, ScrollView } from 'react-native';
import { Grid,
          Col,
          View,
          Container, 
          Button, 
          Text,
          Header,
          Content,
          Right,
          Body,
          Left,
          Icon,
          Footer,
          FooterTab,
          Title,
          Thumbnail,
          Form, 
          Input,
          Item } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../../contractor/styles.js';


const profile = require('../../../../assets/profile.png');

export default class EditUserProfile extends React.Component {
  constructor(props){
        super(props)
        this.state={
            
        }
    }

    imageUpload(){
      console.log("image uploading");
    }

  render(){

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
        <View style={{alignItems:'center',marginTop:20}}>
          <Thumbnail large source={profile} style={{height:200,width:200}}/>
          <Text onPress={this.imageUpload} style={{marginTop:10}}>Choose Photo...</Text>
          <Form>
            <Item rounded style={{width:"90%", marginTop:10}}>
              <Input placeholder="First Name" />
            </Item>
            <Item rounded style={{width:"90%", marginTop:10}}>
              <Input placeholder="Last Name" />
            </Item>
            <Item rounded style={{width:"90%", marginTop:10}}>
              <Input placeholder="Contact No." />
            </Item>
            <Item rounded style={{width:"90%", marginTop:10}}>
              <Input placeholder="Address" />
            </Item>
            <Grid style={{marginTop:10, marginBottom:20}}>
              <Col>
                <Button primary style={{width:"90%"}}>
                  <Text>Home</Text>
                </Button>
              </Col>
              <Col>
                <Button primary style={{width:"90%"}}>
                  <Text>Edit</Text>
                </Button>
              </Col>
            </Grid>
          </Form>
          </View>
          </ScrollView>                
        </Content>
      </Container>
    );
  }
}