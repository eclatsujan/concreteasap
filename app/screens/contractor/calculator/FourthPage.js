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

export default class FourthPage extends React.Component {
  constructor(props) {
    super(props);    
    this.state = { 
                    first:'',
                    second:'',
                    third:'',
                    fourth:'',
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
    var w = parseFloat(this.state.first);
    var h = parseFloat(this.state.second)/1000.0;
    var d = parseFloat(this.state.third)/1000.0;
    var q = parseFloat(this.state.fourth);

    if (!isNaN(w) && !isNaN(h) && !isNaN(d) && !isNaN(q)) {
        var tot = 0;
        for (var j=1; j<=q; ++j) {
            tot += j;
        }

        var v = tot * h * w * d;
        total = v;
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
            <Button onPress={()=>this.props.navigation.navigate("first")}>
              <Text>Slab</Text>
            </Button>
            <Button onPress={()=>this.props.navigation.navigate("second")}>
              <Text>Footing</Text>
            </Button>
            <Button onPress={()=>this.props.navigation.navigate("third")}>
              <Text>Column</Text>
            </Button>
            <Button active onPress={()=>this.props.navigation.navigate("fourth")}>
              <Text>Steps</Text>
            </Button>
          </FooterTab>
        </Footer>
          <Form>
            <Item floatingLabel>   
              <Label style={{fontSize:18}}>W(m)</Label>   
              <Input value={this.state.first} style={{fontSize:20}} onChangeText={(first) => this.setState({first})}
              keyboardType='numeric' />
            </Item>
            <Item floatingLabel>   
              <Label style={{fontSize:18}}>Riser H (mm)</Label>   
              <Input value={this.state.second} style={{fontSize:20}} onChangeText={(second) => this.setState({second})} 
              keyboardType='numeric'/>
            </Item>
            <Item floatingLabel>   
              <Label style={{fontSize:18}}>Step Depth(mm)</Label>   
              <Input value={this.state.third} style={{fontSize:20}} onChangeText={(third) => this.setState({third})} 
              keyboardType='numeric'/>
            </Item>
            <Item floatingLabel>   
              <Label style={{fontSize:18}}>No. of steps</Label>   
              <Input value={this.state.third} style={{fontSize:20}} onChangeText={(third) => this.setState({third})} 
              keyboardType='numeric'/>
            </Item>
            <View style={styles.container}>
              <Text style={{fontSize:20, fontWeight:'bold'}}>{this.state.total}</Text>
            </View>
            <View style={styles.container}>
              <Button light onPress={this.onPressButton} style={{alignItems: 'center', width:100}}><Text> Calculate </Text></Button>
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
  