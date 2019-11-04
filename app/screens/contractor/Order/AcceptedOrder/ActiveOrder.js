import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {
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
    Grid,
    Col
} from 'native-base';
import {DrawerActions} from 'react-navigation-drawer';
import {styles} from '../../styles.js';

import {connect} from "react-redux";


class ActiveOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        >
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Concrete ASAP</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='person'/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Text style={{textAlign: "center", fontSize: 20, fontWeight: 'bold',}}>Active Order</Text>
                    <i class="material-icons">
                        remove_red_eye
                    </i>
                    <View style={styles.registerButton}>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>View Full Order Details</Text>
                        </TouchableOpacity>
                    </View>
                    <Grid>
                        <Col style={{marginLeft: 15, marginTop: 15}}>
                            <Text>On Site / Call</Text>
                            <Text>Total Amount</Text>
                            <Text>Price per m3</Text>
                            <Text>Order No.</Text>
                            <Text>Delivery Date</Text>
                            <Text>Delivery Time</Text>
                            <Text>Address</Text>
                        </Col>
                        <Col style={{marginTop: 15}}>
                            <Text>On Site / Call</Text>
                            <Text>Total Amount</Text>
                            <Text>Price per m3</Text>
                            <Text>Order No.</Text>
                            <Text>Delivery Date</Text>
                            <Text>Delivery Time</Text>
                            <Text>Address</Text>
                        </Col>
                    </Grid>
                    <View style={styles.registerButton}>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Confirm Order Delivery</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.registerButton}>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Modify Order</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.registerButton}>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Complete Order</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 30, width: "99%", alignItems: 'center', marginBottom: 20,}}>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Cancel Order</Text>
                        </TouchableOpacity>
                    </View>
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

const mapStateToProps = (state) => {
    const {user, app} = state;
    return {user, app};
};

export default connect(mapStateToProps, null)(ActiveOrder);