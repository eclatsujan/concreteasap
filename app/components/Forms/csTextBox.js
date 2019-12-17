import React from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Item as FormItem, Input,Icon} from 'native-base';
import {appStyles} from "../../../assets/styles/app_styles";
import {getErrorStyle, showErrorIcon, showErrorMessage} from "../../helpers/error";

/**
 * to be wrapped with redux-form Field component
 */
class csTextBox extends React.Component{

    constructor(props) {
        super(props);
    }

    showIcon(){
        return <TouchableOpacity onPress={this.props["iconClick"]}>
            <Icon active name={this.props["iconType"]} />
        </TouchableOpacity>;
    }

    showErrorIcon(hasError){
        return hasError ? showErrorIcon(hasError) : null;
    }

    render() {
        const {input, meta: {touched, error, warning},editable,onChange, ...inputProps} = this.props;

        const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
            'submitting', 'touched', 'valid', 'visited'];

        let hasError = false;
        if (touched && (error || warning)) {
            hasError = true;
        }
        let style=editable!==false?null:{backgroundColor:"#DCDCDC"};
        return (
            <View>
                <FormItem style={[appStyles.loginInput, getErrorStyle(hasError)]} regular>
                    <Input
                        placeholderTextColor={"#000000"}
                        style={[style,appStyles.baseFontSize]}
                        {...inputProps}
                        defaultValue={input.value}
                        onChangeText={(text) => {
                            input.onChange(text);
                            onChange?onChange():null;
                        }}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                        editable={editable}
                    />
                    {this.props["iconType"] ?this.showIcon():this.showErrorIcon()}
                </FormItem>
                {hasError ? showErrorMessage(error) : null}
            </View>
        );
    }

}

export default csTextBox;