import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content, View, Row, Col, Text} from 'native-base';
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import {appStyles} from "../../assets/app_styles";
import TableRow from "../../../components/Tables/TableRow";


export default class ViewFullOrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowColumns: [
                {
                    title: "Post Code",
                    key: "suburb"
                },
                {
                    title: "Quantity",
                    key: "quantity"
                },

                {
                    title: "Type",
                    key: "type"
                },
                {
                    title: "MPA",
                    key: "mpa"
                },
                {
                    title: "Slump",
                    key: "slump"
                },
                {
                    title: "ACC",
                    key: "acc"
                },
                {
                    title: "Placement Type",
                    key: "placement_type"
                },
                {
                    title: "Delivery Preference 1",
                    key: "delivery_date"
                },
                {
                    title: "Delivery Preference 2",
                    key: "delivery_date1"
                },
                {
                    title: "Delivery Preference 3",
                    key: "delivery_date2"
                },
                {
                    title: "Time Preference 1",
                    key: "time_preference1"
                },
                {
                    title: "Time Preference 2",
                    key: "time_preference2"
                },
                {
                    title: "Time Preference 3",
                    key: "time_preference3"
                },
                {
                    title: "Time Urgency",
                    key: "urgency"
                },
                {
                    title: "Message Required",
                    key: "message_required"
                },
                {
                    title: "On Site / On Call",
                    key: "preference"
                },
            ]
        }
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
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Active Order" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={[appStyles.bgWhite]}>
                        <View style={[appStyles.p_5]}>
                            <TableRow rowData={order["order_concrete"]} rowColumns={this.state.rowColumns}/>
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}