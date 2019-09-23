import * as React from 'react';
import { TextInput, StyleSheet, Label } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from './styles.js';



export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
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
                    <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("Current Accepted Order")}>
                        <Text style={styles.mainButtonText}>My Bids</Text>
                    </Button>
                    <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("View Accepted Order")}>
                        <Text style={styles.mainButtonText}>Accepted Bids</Text>
                    </Button>
                    <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("View Order Requests")}>
                        <Text style={styles.mainButtonText}>Open Orders</Text>
                    </Button>
                    <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("Rep Notifications")}>
                        <Text style={styles.mainButtonText}>Notifications</Text>
                    </Button>
                    <Button style={styles.mainButton}>
                        <Text style={styles.mainButtonText}>FAQ</Text>
                    </Button>
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
