import * as React from 'react';
import {ScrollView} from 'react-native';
import {Button,Text,Content,Footer,FooterTab} from 'native-base';
import {styles} from '../styles.js';

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import {appStyles} from "../../../../assets/styles/app_styles";

export default class BidMessageHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {params} = this.props.navigation.state;
        const message = params ? params.message : null;
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <Content contentContainerStyle={styles.content}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'red',
                            marginTop: 50
                        }}>{message}</Text>
                        <Button style={styles.mainButton} onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={styles.mainButtonText}>Back To Home</Text>
                        </Button>
                    </Content>
                </ScrollView>
                <Footer>
                    <FooterTab>
                        <Button style={[appStyles.button, appStyles.buttonPrimary]}
                                onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={appStyles.buttonBlack}>Back to Home</Text>
                        </Button>

                    </FooterTab>
                </Footer>
            </AppBackground>
        );
    }
}
