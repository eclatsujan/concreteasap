import * as React from 'react';
import { ScrollView } from 'react-native';
import { Container, Button, Text,Header,Content,Right,Body,Left,Icon,Title } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {actions} from "../../store";
import {connect} from "react-redux";


import {styles} from '../styles.js';

class OpenOrder extends React.Component {
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
                    <ScrollView>
                        <Text style={styles.mainTitle}>Open Order</Text>

                    </ScrollView>
                </Content>
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
