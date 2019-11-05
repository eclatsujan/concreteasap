import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Text, Content, Col, Row} from 'native-base';

import {connect} from 'react-redux';
import {actions, States} from '../../../../store';

// Custom Component
import AppBackground from '../../../../components/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'

//StyleSheet
import {appStyles} from "../../../assets/app_styles";
import {styles} from '../../styles.js';

class ReviewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.titleName={
            suburb:"Suburb/Post Code",
            mpa:"MPA",
            agg:"AGG",
            slu:"SLUMP",
            acc:"Additional Accelerator",
            placement_type:"Placement Type",
            time1:"Time Preference 1",
            time2:"Time Preference 2",
            time3:"Time Preference 3"
        };
    }

    nextActions(order, special) {
        let full_order = {};
        full_order["suburb"] = order.suburb;
        full_order["type"] = order.type;
        full_order["mpa"] = order.mpa;
        full_order["agg"] = order.agg;
        full_order["slump"] = order.slu;
        full_order["acc"] = order.acc;
        full_order["placement_type"] = order.placement_type;
        full_order["quantity"] = order.quantity;
        full_order["delivery_date"] = order.delivery_date;
        full_order["delivery_date1"] = order.delivery_date1;
        full_order["delivery_date2"] = order.delivery_date2;
        full_order["time_preference1"] = order.time1;
        full_order["time_preference2"] = order.time2;
        full_order["time_preference3"] = order.time3;
        full_order["time_deliveries"] = order.time_difference_deliveries;
        full_order["urgency"] = order.urgency;
        full_order["message_required"] = order.message_required;
        full_order["preference"] = order.site_call;
        full_order["colours"]= order.colours;
        full_order["specialInstructions"] = order.message_required==="Yes"?special.specialInstructions:"";
        full_order["deliveryInstructions"] = order.message_required==="Yes"?special.deliveryInstructions:"";

        if (order.message_required !== "No") {
            this.props.navigation.navigate("ReviewInstructions", {full_order})
        } else {
            this.submitForm(full_order);
        }

    }

    submitForm(order) {
        this.props.submit(order);
    }

    displayOrderList(order) {
        return Object.keys(order).map((key) => {
            return (
                <Row key={key} style={[appStyles.pt_5, appStyles.pb_15, appStyles.borderBottom]}>
                    <Col style={appStyles.w_65}>
                        <Text style={appStyles.capitalCase}>{this.getKeyName(key)}</Text>
                    </Col>
                    <Col style={appStyles.w_35}>
                        <Text>{order[key]}</Text>
                    </Col>
                </Row>
            );
        });
    }

    getKeyName(key){
        return this.titleName.hasOwnProperty(key)?this.titleName[key]:key.replace(/_/g, ' ');
    }

    render() {
        /* 2. Read the params from the navigation state */
        const {params} = this.props.navigation.state;
        const order = params ? params.order : null;
        const special = params ? params.special : null;
        let app=this.props.app.toJS();

        return (
            <AppBackground loading={app.loading}>
                <ScrollView>
                    <AppHeader backMenu/>
                    <Content contentContainerStyle={[styles.content]}>
                        <SubHeader iconName="search" title="Review Order"/>
                        <View style={[appStyles.bgWhite, appStyles.p_15]}>
                            {this.displayOrderList(order)}
                        </View>
                        <Button style={[appStyles.button, appStyles.bgPrimary,appStyles.horizontalCenter]}
                                onPress={() => this.nextActions(order, special)}>
                            <Text
                                style={appStyles.colorBlack}>{order.message_required === "No" ? "NEXT" : "NEXT"}</Text>
                        </Button>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submit: (collection) => {
            return dispatch(actions.order.createOrder(collection))
        },
    }
};

const mapStateToProps = (state) => {
    // const {order, error, app} = state;
    return {
        order:state.get("order"),
        error:state.get("error"),
        app:state.get("app")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
