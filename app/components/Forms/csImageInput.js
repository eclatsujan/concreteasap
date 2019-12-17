import * as React from 'react';

import {Text, View} from 'native-base';
import {appStyles} from "../../../assets/styles/app_styles";
import {TouchableOpacity} from "react-native";
import * as ImagePicker from "expo-image-picker";
import UploadButton from "../Button/UploadButton";

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
            <UploadButton onUpload={this.uploadLogo} placeholder={this.state.logo_name} />
        );
    }
}