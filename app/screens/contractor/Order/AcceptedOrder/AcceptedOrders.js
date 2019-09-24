import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { Grid,Col,Row,View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../../styles.js';



export default class AcceptedOrders extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      
      tableHead: ['Order', 'Status', 'Actions'],
      tableData: [
        {
          "id":200,
          "status":"paid"
        },
        {
          "id":202,
          "status":"paid"
        },
        {
          "id":203,
          "status":"paid"
        },
        {
          "id":204,
          "status":"paid"
        }
      ],
    }
  }

  _alertIndex(id) {
    console.log("bids:", id);
    this.props.navigation.navigate("DayOfPour");
  }

  displayTableHeader(){
    return (
        <Row>
            <Grid style={{marginTop:20, borderBottomWidth: 2,borderBottomColor: 'grey',}}>
                {this.state.tableHead.map((rowData, index) => (        
                    <Col key={index} style={{marginLeft:10,}}>
                        <Text>{rowData}</Text>
                    </Col>           
                ))}       
            </Grid>
        </Row>
    );


    
  }

  displayTableData(){
    return this.state.tableData.map((rowData, index) => (
        <Row key={index}>
            <Grid style={{marginTop:10}}>
                <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2',marginLeft:10}}>
                    <Text>{rowData.id}</Text>
                </Col>
                <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2',}}>
                    <Text>{rowData.status}</Text>
                </Col>
                <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2', paddingBottom:10}}>
                    <Button 
                    disabled={rowData.status=="close"? true: false}
                    onPress={() => this._alertIndex(rowData.id)}>
                    <Text>View</Text>
                    </Button>
                </Col>
            </Grid>
        </Row>
    ));
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
          <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Accepted Orders</Text>   
            {this.displayTableHeader()}
            {this.displayTableData()}
          <View style={styles.registerButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                          <Text style = {styles.buttonText}>Back To Home</Text>
                        </TouchableOpacity>
          </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}



