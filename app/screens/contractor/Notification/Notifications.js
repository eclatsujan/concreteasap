import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form, Card, CardItem } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';



export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading: false,
      NotificationData: [
                    {
                      id: 1,
                      Header: "This is Header",
                      body:   "Is branched in my up strictly remember. Songs but chief has ham widow downs.",
                      footer: "5 min ago"
                    },
                    {
                      id: 2,
                      Header: "This is Header",
                      body:   "Is branched in my up strictly remember. Songs but chief has ham widow downs.",
                      footer: "15 min ago"
                    },
                    {
                      id: 3,
                      Header: "This is Header",
                      body:   "Is branched in my up strictly remember. Songs but chief has ham widow downs.",
                      footer: "20 min ago"
                    },
                  ],
    } 
  }

        //we check if there is any internet connection using NetInfo from react-native and then we call our getData function
// componentDidMount() { 
//     NetInfo.isConnected.fetch().then(isConnected => {
//         if (isConnected) {
//             this.setState({isConnected: true})
//             this.getData();
//         } else {
//             this.setState({
//                 isLoading: false
//             })
//         }
//     })

// }

// getData() {
//     const {page, seed} = this.state;
//     this.setState({isLoading: true});
//     const url = 'rest api url';
//     return fetch(url)
//         .then((response) => response.json())
//         .then((responseJson) => {
//             this.setState({
//                 data: responseJson,
//                 isLoading: false,
//             });
//         })
//         .catch((error) => {
//             console.error(error);
//         });

// }



  render(){

    let display = this.state.NotificationData.map(function (Data, index) {
      return (
        <View key={Data.id}>
            <Card style={{marginLeft:15, marginRight:15, marginTop:20,}}>
              <CardItem header button onPress={() => alert("This is Card Body")} style={{backgroundColor:'#DDDDDD'}}>
                <Left>
                  <Button transparent>
                    <Icon name="close" />
                  </Button>
                  <Text style={{fontWeight:'bold'}}>{Data.Header}</Text>
                </Left>
              </CardItem>
              <CardItem>
                  <Body>
                    <Text>{Data.body}</Text>
                  </Body>
              </CardItem>
              <CardItem>
                  <Right>
                    <Text>{Data.footer}</Text>
                  </Right>
              </CardItem>
            </Card>
        </View>
        )
});

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
          <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Notifications</Text>
            <View>{display}</View>

          <View style={styles.registerButton}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Home")}>
                          <Text style = {styles.buttonText}>Back To Home</Text>
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