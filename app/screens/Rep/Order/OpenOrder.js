import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { Grid,Col,Row,View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';
import {actions} from "../../store";
import {connect} from "react-redux";

class OpenOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        console.log(this.props);
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
                    <ScrollView>
                        <Text style={styles.mainTitle}>Open Order</Text>

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

const mapDispatchToProps = (dispatch) => {
    return {
        getAllOrder: (collection) => {
            return dispatch(actions.order.getAllOrder())
        }
    }
}

const mapStateToProps = (state) => {
    const {order}=state;
    return {order};
}


export default connect(mapStateToProps,mapDispatchToProps)(OpenOrder);