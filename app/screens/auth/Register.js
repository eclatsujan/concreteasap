import * as React from 'react';
import {Container,Header,Button,Text,Body,Form,Title,Content,Left,Icon,Row,Col,Grid} from "native-base";

import {styles} from './styles';

import {appStyles} from '../assets/app_styles';
import {Dimensions, Image, ImageBackground,StatusBar} from "react-native";

export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <ImageBackground source={require("../../../assets/concrete-background.png")} style={{width,height}}>
                <Container style={[appStyles.bgTransparent,appStyles.container]}>
                    <Content style={[appStyles.content]}>
                        <Row>
                            <Col style={appStyles.contentCenter}>
                                <Image source={require("../assets/Logo18.png")} style={appStyles.logo} />
                            </Col>
                        </Row>
                        <Row style={[appStyles.marginAppDefault,{flex:1}]}>
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
                    </Content>
                </Container>
            </ImageBackground>
        );
    }
}
