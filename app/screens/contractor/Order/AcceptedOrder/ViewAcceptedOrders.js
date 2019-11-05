import * as React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Grid,Col,Row,View, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title, } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';

import {styles} from '../../styles.js';

//App Component
import AppBackground from '../../../../components/AppBackground';
import AppHeader from '../../../../components/Headers/AppHeader'
import HomeButton from '../../../../components/Button/HomeButton'


export default class ViewAcceptedOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      tableHead: ['Order', 'Status', 'Actions'],
      tableData: [
        {
          "id":200,
          "status":"open"
        },
        {
          "id":202,
          "status":"open"
        },
        {
          "id":203,
          "status":"close"
        },
        {
          "id":204,
          "status":"close"
        }
      ],
    }
  }

  _alertIndex(id) {
    console.log("bids:", id);
    this.props.navigation.navigate("ViewBids",{itemId:id});
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
                    <Text>Bid Now</Text>
                    </Button>
                </Col>
            </Grid>
        </Row>
    ));
  }

  render(){

    return (
       <AppBackground>
        <Header transparent>
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
          <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>View Accepted Orders</Text>
            {this.displayTableHeader()}
            {this.displayTableData()}
          <View style={styles.registerButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
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
      </AppBackground>
    );
  }
}
