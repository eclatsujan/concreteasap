import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content, Button, Text, Textarea, View, Form} from 'native-base';

import {connect} from 'react-redux';
import {actions} from '../../../../store';

// Custom Component
import AppBackground from '../../../../components/App/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'

//StyleSheet
import {appStyles} from "../../../../../assets/styles/app_styles";
import CustomButton from "../../../../components/Basic/Button/CustomButton";
import {isDefined} from "../../../../helpers/app";


class ReoReviewInstructions extends React.Component {
    constructor(props) {
        super(props);
    }

    submitForm() {
        let full_order=this.props.order;
        if(!isDefined(full_order.get("id"))){
            this.props.createOrder(full_order.toJS());
        }
        else{

        }
    }

    render() {
        const {params} = this.props.navigation.state;
        let full_order=this.props.order;
        let order_id = this.props.navigation.getParam("order_id");
        console.log(this.props.app.get("loading"));
        return (
            <AppBackground loading={this.props.app.get("loading")}>
                <ScrollView style={appStyles.pb_45}>
                    <AppHeader/>
                    <SubHeader iconName="search" title="Review Instructions"/>
                    <Content style={[appStyles.bgWhite, appStyles.bottomMarginDefault, appStyles.p_10]}>
                        <View style={[appStyles.my_5]}>
                            <Text style={[appStyles.boldFont,appStyles.upperCase, appStyles.colorBlack,appStyles.mb_10]}>Special
                                Instructions</Text>
                            <Text style={[appStyles.baseFont]}>{full_order?.get("special_instructions")}</Text>
                        </View>
                        <View style={[appStyles.borderBottom2, appStyles.borderGray44, appStyles.my_30]}/>
                        <View style={[appStyles.my_5]}>
                            <Text style={[appStyles.boldFont, appStyles.upperCase, appStyles.colorBlack,appStyles.mb_10]}>Delivery
                                Instructions</Text>
                            <Text style={[appStyles.baseFont]}>{full_order?.get("delivery_instructions")}</Text>
                        </View>
                    </Content>
                    <CustomButton btnText={"Next"} onPress={() => this.submitForm()} />
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: (order) => {
            return dispatch(actions.reo.pendingActions.createReoOrder(order))
        },
        modifyOrder: (order,order_type) => {
            return dispatch(actions.order.modifyOrder(order,order_type));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        order: state?.get("form")?.get("placeReoOrder")?.get("values"),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReoReviewInstructions);

