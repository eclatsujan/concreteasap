import * as React from 'react';
import {Container,Header,Button,Text,Body,Form,Title,Content,Left,Icon} from "native-base";

import {styles} from './styles';

export default class Register extends React.Component {
  
  constructor() {
    super();
    this.state = {

    };
  }



  render() {
      return (      
        <Container>
          <Header>  
            <Left>
              <Button
                transparent
               onPress={()=>this.props.navigation.goBack()}           >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Concrete ASAP</Title>
            </Body>
          </Header>
          <Content>            
            <Form>                 
              <Button full primary style={styles.button} onPress={()=> this.props.navigation.navigate('RegContractor')}>
                <Text>Register as Contractor</Text>
              </Button> 
              <Button full primary style={styles.button} onPress={()=> this.props.navigation.navigate('repRegister')}>
                <Text>Register as Rep</Text>
              </Button>             
            </Form>
          </Content>
        </Container>      
      );
    }    
}
