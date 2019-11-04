import * as React from 'react';
import {TextInput, StyleSheet, Label, TouchableOpacity, ScrollView} from 'react-native';
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
import {styles} from '../styles.js';


export default class OrderBidStatus extends React.Component {
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
                    <ScrollView>
                        <Text style={{textAlign: "center", fontSize: 20, fontWeight: 'bold',}}>Order Bid Status</Text>
                        <Grid style={{borderBottomWidth: 2, borderBottomColor: 'grey'}}>
                            <Col style={{marginLeft: 15, marginTop: 15, marginBottom: 20}}>
                                <Text>Suburb / Post Code</Text>
                                <Text>Type</Text>
                                <Text>MPA</Text>
                                <Text>AGG</Text>
                                <Text>Slump</Text>
                                <Text>Addatives</Text>
                                <Text>Placement Type</Text>
                                <Text>Quantity</Text>
                                <Text>Time</Text>
                                <Text>Date</Text>
                                <Text>Urgency</Text>
                                <Text>On Site / Call</Text>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>Message Required:</Text>
                            </Col>
                            <Col style={{marginTop: 15, marginBottom: 20}}>
                                <Text>Suburb / Post Code</Text>
                                <Text>Type</Text>
                                <Text>MPA</Text>
                                <Text>AGG</Text>
                                <Text>Slump</Text>
                                <Text>Addatives</Text>
                                <Text>Placement Type</Text>
                                <Text>Quantity</Text>
                                <Text>Time</Text>
                                <Text>Date</Text>
                                <Text>Urgency</Text>
                                <Text>On Site / Call</Text>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>Yes</Text>
                            </Col>
                        </Grid>
                        <Grid style={{marginTop: 20}}>
                            <Col><Text> Select Payment Method</Text></Col>
                            <Col>
                                <Button style={{marginTop: 10}}>
                                    <Text>COD</Text>
                                </Button>
                                <Button style={{marginTop: 10}}>
                                    <Text>Account</Text>
                                </Button>
                            </Col>
                        </Grid>
                        <View style={styles.registerButton}>
                            <TouchableOpacity>
                                <Text style={styles.buttonText}>Confirm</Text>
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