import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content,View,Row,Col,Text} from 'native-base';
import AppBackground from "../../../../components/AppBackground";
import AppHeader from "../../../../components/AppHeader";
import SubHeader from "../../../../components/SubHeader";
import {appStyles} from "../../../assets/app_styles";


export default class ViewFullOrderDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    nextActions(formData, special) {
        if (formData.message_required !== "No") {
            this.props.navigation.navigate("ReviewInstructions", {formData: formData, special: special})
        } else {

        }
    }

    displayRow(title, value) {
        return (
            <Row>
                <Col><Text>{title}</Text></Col>
                <Col><Text>{value}</Text></Col>
            </Row>
        )
    }

    render() {
        /* 2. Read the params from the navigation state */
        const {params} = this.props.navigation.state;
        const order = params ? params.order : null;
        console.log(order);
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="user" title="Order Details"/>
                    <Content style={[appStyles.bgWhite]}>
                        <View style={[appStyles.p_5]}>
                            {this.displayRow("Suburb / Post Code", order["order_concrete"]["suburb"])}
                            {this.displayRow("Type", order["order_concrete"]["type"])}
                            {this.displayRow("MPA", order["order_concrete"]["mpa"])}
                            {this.displayRow("AGG", order["order_concrete"]["agg"])}
                            {this.displayRow("Slump", order["order_concrete"]["slu"])}
                            {this.displayRow("Additives", order["order_concrete"]["acc"])}
                            {this.displayRow("Placement Type", order["order_concrete"]["placement_type"])}
                            {this.displayRow("Quantity", order["order_concrete"]["quantity"])}
                            {this.displayRow("Time", order["order_concrete"]["delivery_time"])}
                            {this.displayRow("Date", order["order_concrete"]["delivery_date"])}
                            {this.displayRow("Urgency", order["order_concrete"]["urgency"])}
                            {this.displayRow("Preference", order["order_concrete"]["preference"])}
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}