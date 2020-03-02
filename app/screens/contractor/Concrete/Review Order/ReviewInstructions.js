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


class ReviewInstructions extends React.Component {
    constructor(props) {
        super(props);
    }

    submitForm(full_order, order_id) {
        if (order_id) {
            let order_type=this.props.navigation.getParam("order_type")?this.props.navigation.getParam("order_type"):"accepted_orders";

            this.props.modifyOrder(full_order.set("order_id",order_id).toJS(),order_type);
        } else {
            this.props.createOrder(full_order.toJS());
        }
    }

    render() {
        const {params} = this.props.navigation.state;
        const full_order = params ? params.full_order : null;
        let order_id = this.props.navigation.getParam("order_id");
        return (
            <AppBackground loading={this.props.app.get("loading")}>
                <ScrollView style={appStyles.pb_45}>
                    <AppHeader/>
                    <SubHeader iconName="search" title="Review Instructions"/>
                    <Content style={[appStyles.bgWhite, appStyles.bottomMarginDefault, appStyles.p_10]}>
                        <View style={[appStyles.my_5]}>
                            <Text style={[appStyles.boldFont,appStyles.upperCase, appStyles.colorBlack,appStyles.mb_10]}>Special
                                Instructions</Text>
                            <Text style={[appStyles.baseFont]}>{full_order.get("special_instructions")}</Text>
                        </View>
                        <View style={[appStyles.borderBottom2, appStyles.borderGray44, appStyles.my_30]}/>
                        <View style={[appStyles.my_5]}>
                            <Text style={[appStyles.boldFont, appStyles.upperCase, appStyles.colorBlack,appStyles.mb_10]}>Delivery
                                Instructions</Text>
                            <Text style={[appStyles.baseFont]}>{full_order.get("delivery_instructions")}</Text>
                        </View>
                    </Content>
                    <Button style={[appStyles.button, appStyles.bgPrimary, appStyles.horizontalCenter]}
                            onPress={() => this.submitForm(full_order, order_id)}>
                        <Text style={appStyles.colorBlack}>NEXT</Text>
                    </Button>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: (order) => {
            return dispatch(actions.order.createOrder(order))
        },
        modifyOrder: (order,order_type) => {
            return dispatch(actions.order.modifyOrder(order,order_type));
        }
    }
};

const mapStateToProps = (state) => {
    // const {order, app} = state;
    return {
        order: state.get("order"),
        app: state.get("app")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReviewInstructions);
