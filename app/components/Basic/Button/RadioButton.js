import React from "react";
import {View, TouchableOpacity} from "react-native";

export default class UploadButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }, props.style]}>
                {
                    props.selected ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }}/>
                        : null
                }
            </View>
        );
    }
}