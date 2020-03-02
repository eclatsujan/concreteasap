import React from 'react';
import {View} from 'react-native';
import {Picker} from 'native-base';
import {getErrorStyle, showErrorIcon, showErrorMessage} from "../../../helpers/error";

import {appStyles} from "../../../../assets/styles/app_styles";

/**
 * to be wrapped with redux-formValues Field component
 */
class csPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            pickerValue:this.props["input"]["value"]?this.props["input"]["value"]:""
        }
    }

    render() {
        const {input: {onChange, value, ...input}, meta: {touched, error, warning,submitting}, pickerChildren, ...inputProps} = this.props;

        let hasError = false;

        if (touched && ((error) || (warning))) {
            hasError = true;
        }

        return (
            <View>
                <View style={[appStyles.bgWhite, appStyles.my_7, appStyles.borderRadiusDefault]}>
                    <Picker
                        textStyle={[appStyles.fontSize, appStyles.defaultFont]}
                        itemTextStyle={[appStyles.baseFontSize, appStyles.defaultFont]}
                        headerTitleStyle={[appStyles.baseFontSize, appStyles.defaultFont]}
                        headerBackButtonTextStyle={[appStyles.baseFontSize, appStyles.defaultFont]}
                        placeholderStyle={[appStyles.baseFontSize, appStyles.defaultFont]}
                        itemStylePropType={[appStyles.baseFontSize, appStyles.defaultFont]}
                        // headerStyle=
                        onValueChange={(val) => {
                            onChange(val);
                            this.setState({pickerValue:val})
                            this.props["onSelectValue"]?this.props["onSelectValue"](val):null;
                        }}
                        mode={"dropdown"}
                        selectedValue={this.state.pickerValue}
                    >
                        {this.props.children}
                    </Picker>
                </View>
                {hasError ? showErrorMessage(error) : null}
            </View>
        );
    }

}

export default csPicker;