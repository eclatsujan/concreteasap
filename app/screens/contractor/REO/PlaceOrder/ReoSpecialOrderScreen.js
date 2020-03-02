import * as React from 'react';
import {ScrollView} from 'react-native';
import AppBackground from "../../../../components/App/AppBackground";
import AppHeader from "../../../../components/Headers/AppHeader";
import {connect} from "react-redux";
import SubHeader from "../../../../components/Headers/SubHeader";
import ReoSpecialForm from "../../../../components/contractor/REO/Order/ReoSpecialForm";

class ReoReviewScreen extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.navigation.navigate("Reo Review Order");
    }

    render() {
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader bgColor={"#30C5E1"} iconType="ConcreteASAP" iconName="mesh" title="Place REO Request"/>
                    <ReoSpecialForm onSubmit={this.handleSubmit}
                                    selectedTime={this.props.time}/>
                </ScrollView>

            </AppBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        order: state?.get("form")?.get("placeReoOrder")?.get("values"),
    };
};


export default connect(mapStateToProps, null)(ReoReviewScreen);