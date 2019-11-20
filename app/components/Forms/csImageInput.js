import * as React from 'react';

import {Text, View} from 'native-base';
import {appStyles} from "../../../assets/styles/app_styles";
import {TouchableOpacity} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default class csImageInput extends React.Component {

    constructor(props){
        super(props);
        this.state={
            "logo_name":"logo"
        };
        this.uploadLogo=this.uploadLogo.bind(this);
    }

    async uploadLogo() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            if (result.type !== "image") {
                alert("Please Select the valid type of file");
            }
            this.props.input["onChange"](result);
            this.setState({"logo_name":"Logo has been selected"});
        }
        else{
            this.setState({"logo_name":"Logo"});
        }

    }

    render(){
        const {input, meta: {touched, error, warning}, ...inputProps} = this.props;

        const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
            'submitting', 'touched', 'valid', 'visited'];

        let hasError = false;
        if (touched && (error || warning)) {
            hasError = true;
        }
        console.log(hasError);
        return (
            <View style={[appStyles.bgWhite, appStyles.borderRadiusDefault, appStyles.my_5]}>
                <TouchableOpacity
                    style={[appStyles.baseFont, appStyles.py_5, appStyles.px_10]}
                    onPress={this.uploadLogo}>
                    <View style={[appStyles.flexRow]}>
                        <View style={[appStyles.w_65, appStyles.horizontalCenter]}>
                            <Text style={[appStyles.defaultFont]}>{this.state.logo_name}</Text>
                        </View>
                        <View
                            style={[appStyles.w_35, appStyles.bgBlack, appStyles.py_10, appStyles.borderRadiusDefault]}>
                            <Text style={[appStyles.colorWhite, appStyles.txtCenter]}>Upload</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}