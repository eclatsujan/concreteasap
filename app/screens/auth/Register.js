import * as React from 'react';
import {Container,Header,Button,Text,Body,Form,Title,Content,Left,Icon,Row,Col,Grid} from "native-base";

import {styles} from './styles';

import {appStyles} from '../assets/app_styles';
import {Dimensions, Image, ImageBackground} from "react-native";

export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        let { height, width } = Dimensions.get('window');
        console.log(height);
        return (
            <ImageBackground source={require("../../../assets/concrete-background.png")} style={{width,height}}>
                <Container style={[appStyles.bgTransparent]}>
                    <Header style={[appStyles.headerHeight]} transparent>
                        <Grid>
                            <Row>
                                <Col style={appStyles.contentCenter}>
                                    <Image source={require("../assets/Logo18.png")} style={appStyles.logoHeader} />
                                </Col>
                            </Row>
                        </Grid>
                    </Header>
                    <Content>
                        <Grid>
                            <Row>
                                <Col>
                                    <Form>
                                        <Button full style={appStyles.button} onPress={()=> this.props.navigation.navigate('RegContractor')}>
                                            <Text style={appStyles.btnTxt}>Register as Contractor</Text>
                                        </Button>
                                        <Button full style={appStyles.button} onPress={()=> this.props.navigation.navigate('repRegister')}>
                                            <Text style={appStyles.btnTxt}>Register as Rep</Text>
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Grid>
                    </Content>
                </Container>
            </ImageBackground>
        );
    }
}
