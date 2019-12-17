import React from 'react';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import {ScrollView} from 'react-native';
import {Item as FormItem, Input, List} from 'native-base';
import LocationItem from '../Google/Location/LocationItem';
import {appStyles} from "../../../assets/styles/app_styles";


const API_KEY = "AIzaSyDselUuFWV1FDEQ00HlqcLA3dCOeQB8AA0";

export default class csPlacePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "locations":[],
            "location": ""
        };
        this.updateLocationState = this.updateLocationState.bind(this);
        // this.setLocations=this.setLocations.bind(this);
    }

    updateLocationState(value) {
        this.setState({location: value});
    }

    render() {
        const {input: {onChange, value, ...input}, meta: {touched, error, warning, submitting}, pickerChildren, ...inputProps} = this.props;

        let hasError = false;

        if (touched && ((error) || (warning))) {
            hasError = true;
        }

        return (
            <GoogleAutoComplete apiKey={API_KEY} debounce={300} minLength={5} components="country:au">
                {({inputValue, handleTextChange, locationResults, isSearching, fetchDetails}) => {
                    return (
                        <React.Fragment>
                            <FormItem style={[appStyles.loginInput]}>
                                <Input
                                    value={this.state.location}
                                    style={appStyles.baseFontSize}
                                    onChangeText={(value) => {
                                        handleTextChange(value);
                                        this.updateLocationState(value);
                                    }}
                                    placeholder="Address"
                                />
                            </FormItem>
                            <ScrollView style={{maxHeight: 200, backgroundColor: "#fff"}} nestedScrollEnabled={true}>
                                <List>
                                    {locationResults.map((el, i) => (
                                        <LocationItem
                                            {...el}
                                            fetchDetails={fetchDetails}
                                            key={String(i)}
                                            onLocationSelect={this.updateLocationState}
                                        />
                                    ))}
                                </List>
                            </ScrollView>
                        </React.Fragment>
                    )
                }}
            </GoogleAutoComplete>
        );
    }

}