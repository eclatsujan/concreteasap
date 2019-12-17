import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, ListItem, Left, Right, Icon, Row} from 'native-base';
import {appStyles} from "../../../../assets/styles/app_styles";

export default class LocationItem extends React.Component {

    constructor(props) {
        super(props);
        // this.onListPress = this.onListPress.bind(this);
    }

    onListPress(text) {
        this.props["onLocationSelect"] ? this.props["onLocationSelect"](text) : null;
    }

    render() {
        let location_name = this.props["location_name"];
        return (
            <ListItem style={[appStyles.p_5]} button={true} onPress={() => {
                this.onListPress({
                    location_name,
                    postcode:this.props["postcode"]
                });
            }}>
                <Left>
                    <Text style={appStyles.arialFont}>{location_name}</Text>
                </Left>
                <Right>
                    <Icon name={"check-circle"} type={"FontAwesome5"} color={"#2E2E2E"}/>
                </Right>
            </ListItem>
        );
    }

}