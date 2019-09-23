import * as React from 'react';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { View, 
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
          Grid,
          Col,
          Form,
          Item, 
          Input, 
          Label,
           } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from './styles.js';

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);    
    this.state = { 
                    first:'',
                    second:'',
                    third:'',
                    total:'',
                  }
      this.clear = this.clear.bind(this);
      this.onPressButton = this.onPressButton.bind(this);
  }

  clear(){
    this.setState({first:''});
    this.setState({second:''});
    this.setState({third:''});
    this.setState({total:''});
  }

  onPressButton(){
    var total = 0;
    var l = parseFloat(this.state.first);
    var w = parseFloat(this.state.second);
    var h = parseFloat(this.state.third)/1000;
    if (!isNaN(l) && !isNaN(w) && !isNaN(h)) {
        var v = l*w*h;        
        total = v.toFixed(1);
    }
    this.setState({total:total});
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
        <Content>
        <Footer>
          <FooterTab>
            <Button active onPress={()=>this.props.navigation.navigate("first")}>
              <Text>Slab</Text>
            </Button>
            <Button onPress={()=>this.props.navigation.navigate("second")}>
              <Text>Footing</Text>
            </Button>
            <Button onPress={()=>this.props.navigation.navigate("third")}>
              <Text>Column</Text>
            </Button>
            <Button onPress={()=>this.props.navigation.navigate("fourth")}>
              <Text>Steps</Text>
            </Button>
          </FooterTab>
        </Footer>
          <Form>
            <Item floatingLabel>   
              <Label style={{fontSize:18}}>L(m)</Label>   
              <Input value={this.state.first} style={{fontSize:20}} onChangeText={(first) => this.setState({first})}
              keyboardType='numeric' />
            </Item>
            <Item floatingLabel>   
              <Label style={{fontSize:18}}>W(m)</Label>   
              <Input value={this.state.second} style={{fontSize:20}} onChangeText={(second) => this.setState({second})} 
              keyboardType='numeric'/>
            </Item>
            <Item floatingLabel>   
              <Label style={{fontSize:18}}>D(m)</Label>   
              <Input value={this.state.third} style={{fontSize:20}} onChangeText={(third) => this.setState({third})} 
              keyboardType='numeric'/>
            </Item>
            <View style={styles.container}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>{this.state.total}</Text>
            </View>
            <View style={styles.container}>
            <Button light onPress={this.onPressButton}><Text> Calculate </Text></Button>
            </View>
            <View style={styles.container}>
            <Button primary onPress={this.clear}><Text> Clear </Text></Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}