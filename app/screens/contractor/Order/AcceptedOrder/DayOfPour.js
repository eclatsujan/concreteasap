import * as React from 'react';
import {ScrollView} from 'react-native';
import {Col, Row, Button, Text, Content,View,Icon} from 'native-base';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import AppBackground from '../../../../components/AppBackground';
import AppHeader from '../../../../components/AppHeader'
import SubHeader from '../../../../components/SubHeader'


//styles
import {appStyles} from "../../../assets/app_styles";
import {actions} from "../../../../store/modules";


class DayOfPour extends React.Component {
    constructor(props) {
        super(props);
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // this.setState({loading: true});
            let order_id=this.props.navigation.getParam("order_id");
            this.props.getSingleOrder(order_id);
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    displayRow(title,value){
        return (
            <Row>
                <Col>
                    <Text>{title}</Text>
                </Col>
                <Col>
                    <Text>{value}</Text>
                </Col>
            </Row>);
    }

    viewFullOrder(order){
        // console.log(this.props.navigation);
        this.props.navigation.navigate("ViewFullOrderDetails",{
            order:order.current_order
        });

    }

    render() {
        let order=this.props.order.toJS();
        let app=this.props.app.toJS();
        let concrete_order=order.current_order["order_concrete"]?order.current_order["order_concrete"]:{}
        let bid=order.current_order.bids?order.current_order.bids[0]:{};
        return (
            <AppBackground loading={app.loading}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="user" title="Active Order"/>
                    <Content>
                        <Button style={[appStyles.marginDefault,appStyles.horizontalCenter]} onPress={() => this.viewFullOrder(order)}>
                            <Icon style={[appStyles.colorBlack]} type="FontAwesome" name="user" />
                            <Text style={[appStyles.colorBlack]}>View Full Order Details</Text>
                        </Button>
                        <View style={[appStyles.bgWhite,appStyles.my_10,appStyles.p_5]}>
                            {this.displayRow("On Site/On Call",concrete_order["preference"])}
                            {this.displayRow("Total Amount","$"+bid["price"])}
                            {this.displayRow("Order Number",order.current_order["id"])}
                            {this.displayRow("On Site/On Call",concrete_order["delivery_date"])}
                            {this.displayRow("On Site/On Call",concrete_order["time_preference1"])}
                            {this.displayRow("On Site/On Call",concrete_order["suburb"])}
                        </View>
                        <Button style={[appStyles.marginDefault,appStyles.horizontalCenter]}>
                            <Text style={[appStyles.colorBlack]}>Confirm Order Delivery</Text>
                        </Button>
                        <Button style={[appStyles.marginDefault,appStyles.horizontalCenter]} onPress={() => this.props.navigation.navigate("ModifyOrder")}>
                            <Text style={[appStyles.colorBlack]}>Modify Order</Text>
                        </Button>
                        <Button style={[appStyles.marginDefault,appStyles.horizontalCenter]}>
                            <Text style={[appStyles.colorBlack]}>Complete Order</Text>
                        </Button>
                        <Button style={[appStyles.marginDefault,appStyles.horizontalCenter]}>
                            <Text style={[appStyles.colorBlack]}>Contact Rep</Text>
                        </Button>
                        <Button style={[appStyles.marginDefault,appStyles.horizontalCenter]}>
                            <Text style={[appStyles.colorBlack]}>Cancel Order</Text>
                        </Button>
                    </Content>

                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleOrder: (order_id) => {
            return dispatch(actions.order.getSingleOrder(order_id))
        },
    }
};

const mapStateToProps = (state) => {
    return {
        order: state.get("order"),
        app: state.get("app")
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DayOfPour));