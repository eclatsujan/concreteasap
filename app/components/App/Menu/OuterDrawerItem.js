import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {appStyles} from "../../../../assets/styles/app_styles";

export default class OuterDrawerItem extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const {label,onPress}=this.props;
        const txtColor=label==="Reo"?appStyles.colorBlueLgt:appStyles.colorPrimary;
        return (
            <TouchableOpacity
                onPress={onPress}>
                <View
                    style={[{justifyContent:"space-between"},appStyles.flexWrap,appStyles.flexRow,appStyles.py_15, appStyles.ml_20, appStyles.borderGray44, appStyles.borderBottom]}>
                    <Text style={[txtColor, appStyles.upperCase, appStyles.boldFont]}>{label}</Text>
                    <Icon name="chevron-right" size={20} style={[appStyles.colorWhite]} />
                </View>
            </TouchableOpacity>
        );
    }

}

// export default OuterDrawerItem;