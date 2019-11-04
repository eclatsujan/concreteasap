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

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);    
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
          <Thumbnail large source={profile} style={{height:200,width:200}} />
          <Form>
            <Item rounded style={{width:"90%", marginTop:10}}>
              <Input placeholder="First Name" disabled/>
            </Item>
            <Item rounded style={{width:"90%", marginTop:10}}>
              <Input placeholder="Last Name" disabled/>
            </Item>
            <Item rounded style={{width:"90%", marginTop:10}}>
              <Input placeholder="Contact No." disabled/>
            </Item>
            <Item rounded style={{width:"90%", marginTop:10}}>
              <Input placeholder="Address" disabled/>
            </Item>
            <Grid style={{marginTop:10, marginBottom:20}}>
              <Col>
                <Button primary style={{width:"90%", textAlign:"center"}} onPress={()=>this.props.navigation.navigate("Home")}>
                  <Text>Home</Text>
                </Button>
              </Col>
              <Col>
                <Button primary style={{width:"90%", textAlign:"center"}} onPress={()=>this.props.navigation.navigate("EditUserProfile")}>
                  <Text>Edit</Text>
                </Button>
              </Col>
            </Grid>
          </Form>
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