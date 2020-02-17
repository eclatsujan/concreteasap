import * as React from 'react';
import {Linking, TouchableWithoutFeedback,Alert} from 'react-native';
import {View, Thumbnail, Text,Icon} from 'native-base';
import {appStyles} from "../../../assets/styles/app_styles";
import {phoneFormat} from "../../helpers/time";

export class UserContactDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    phoneClick(value) {
        let phoneNumber = value;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${value}`;
        } else {
            phoneNumber = `tel:${value}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert("Phone Number Issue",'Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            }).catch(err => console.log(err));
    }

    displayPhone(value) {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.phoneClick(value);
            }}>
                <View style={[appStyles.flexRow,appStyles.flexWrap]}>
                    <View style={appStyles.w_90}>
                        <Text>{value}</Text>
                    </View>
                    <View style={appStyles.w_10}>
                        <Icon name='phone' type="FontAwesome5" style={[appStyles.colorBlack,{fontSize:15}]}/>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        )
    }

    displayDetail(row, rowColumns) {
        return row?.length === 0 ? null : rowColumns.map((val, index) => {
            let value = row?.get(val["key"]);
            return (
                <View key={index} style={[appStyles.mb_5, appStyles.borderBottom, appStyles.borderGray44]}>
                    <View>
                        <Text style={[appStyles.boldFont]}>{val["title"]}</Text>
                    </View>
                    {val["title"] === "Phone Number"
                        ? this.displayPhone(value)
                        : <View>
                            <Text>{value}</Text>
                        </View>}
                </View>
            );
        });
    }

    render() {
        return (
            <View style={[appStyles.bgWhite, appStyles.p_10]}>
                <View style={[appStyles.flex, appStyles.verticalCenter]}>
                    <View>
                        <Thumbnail large source={{uri: this.props?.["userProfile"]}}/>
                    </View>
                </View>
                <View>
                    {this.displayDetail(this.props.row, this.props.rowColumns)}
                </View>
            </View>
        );
    }
}