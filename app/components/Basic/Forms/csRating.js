import * as React from 'react';
import {AirbnbRating} from "react-native-ratings";
import {View} from "react-native";
import {showErrorMessage} from "../../../helpers/error";


export default class csRating extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {input, meta: {touched, error, warning}, ...inputProps} = this.props;

        const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
            'submitting', 'touched', 'valid', 'visited'];

        let hasError = false;
        if (touched && (error || warning)) {
            hasError = true;
        }

        return (
            <View>
                <View>
                    <AirbnbRating
                    showRating={false} type="star"
                    ratingCount={5} defaultRating={0}
                    size={22} onFinishRating={(rate) => {
                        input.onChange(rate);
                }}/>
                </View>
                {hasError ? showErrorMessage(error) : null}
            </View>
        )
    }
}

