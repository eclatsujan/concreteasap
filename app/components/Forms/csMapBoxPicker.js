import React from 'react';
import {Input, Item as FormItem, List} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";
import {ScrollView, Animated} from "react-native";
import LocationItem from "../Google/Location/LocationItem";
import {mapBoxService} from "../../services/mapBoxService";
import {showErrorMessage} from "../../helpers/error";

export default class csMapBoxPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            location: "",
            fetchStatus: false,
            opacity: new Animated.Value(0),
        };
        this.updateLocationState = this.updateLocationState.bind(this);
        this.fetchMapDetails = this.fetchMapDetails.bind(this);
        this.onLocationSelect = this.onLocationSelect.bind(this);
    }

    updateLocationState(value) {
        const {input: {onChange}} = this.props;
        this.setState({location: value});
        if (value.length > 4) {
            this.fetchMapDetails(value);
        }
        onChange(value);
    }

    fetchMapDetails(search_value) {
        const {input: {onChange}} = this.props;
        if (!this.state.fetchStatus) {
            this.setState({fetchStatus: true});
            setTimeout(() => {
                mapBoxService.searchText(search_value).then((res) => {
                    if (!res.ok) {
                        throw new Error("error");
                        // throw new Error(res[""]);
                    }
                    res.json().then((res) => {
                        let locations = res["features"].map((res) => {
                            let postcode_context = res["context"].find((context) => {
                                return context["id"].startsWith("postcode");
                            });
                            let postcode = "";
                            if (postcode_context) {
                                postcode = postcode_context["text"];
                            }

                            let location_name = res["place_name"].replace(postcode + ", Australia", '');
                            return {
                                location_name,
                                postcode: postcode
                            };
                        });
                        this.setState({locations});
                        this.setState({fetchStatus: false});
                    });

                }).catch((err) => {
                    this.setState({fetchStatus: false});
                });
            }, 1000);
        }
    }

    onLocationSelect(value) {
        const {input: {onChange}} = this.props;
        this.setState({location: value["location_name"]});
        this.setState({locations: []});
        this.props.onMapPick(value);
        onChange(value["location_name"]);
    }

    onFadeIn(){
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    render() {
        const {input, meta: {touched, error, warning}, ...inputProps} = this.props;
        let hasError = false;
        if (touched && (error || warning)) {
            hasError = true;
        }
        return (
            <React.Fragment>
                <FormItem style={[appStyles.loginInput]}>
                    <Input
                        defaultValue={input.value}
                        style={appStyles.baseFontSize}
                        onChangeText={(value) => {
                            this.updateLocationState(value);
                        }}
                        onBlur={() => {
                            this.setState({locations: []})
                        }}
                        placeholder="Address"
                    />
                </FormItem>
                <Animated.ScrollView
                    scrollEventThrottle={1}
                    style={{maxHeight: 200, backgroundColor: "#fff"}}
                    keyboardShouldPersistTaps={"always"}
                    nestedScrollEnabled={true}>
                    <List>
                        {this.state.locations.map((el, i) => (
                            <LocationItem
                                {...el}
                                onLocationSelect={this.onLocationSelect}
                                key={i}
                            />
                        ))}
                    </List>
                </Animated.ScrollView>
                {hasError ? showErrorMessage(error) : null}
            </React.Fragment>
        );
    }

}