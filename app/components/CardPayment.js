import React from "react";
import {Modal} from "react-native";
import {View, Button, Text} from 'native-base';

import {appStyles} from "../../assets/styles/app_styles";

export default class CardPayment extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props["modalVisibility"]}
                onRequestClose={(title, message) => {
                    Alert.alert('Modal has been closed.', message);
                }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    'backgroundColor': 'rgba(000,000,000,0.6)'
                }}>
                    <View style={{
                        width: 250,
                        height: 250,
                        backgroundColor: "white",
                        alignItems: 'center',
                        borderWidth: 2,
                    }}>
                        <Text style={{textAlign: "center", marginTop: 40}}>Do you wanna save the card details?</Text>

                        <Button onPress={() => {
                            this.props["handleModel"](true);
                        }}>
                            <Text>Yes</Text>
                        </Button>
                        <Button onPress={() => {
                            this.props["handleModel"](false);
                        }}>
                            <Text>No</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    }

}
