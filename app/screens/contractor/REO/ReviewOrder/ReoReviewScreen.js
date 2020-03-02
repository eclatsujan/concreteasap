import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Text, Content, Col, Row} from 'native-base';

import moment from "moment";
import {connect} from 'react-redux';

import {actions} from '../../../../store';

// Custom Component
import AppBackground from '../../../../components/App/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'

//StyleSheet
import {appStyles} from "../../../../../assets/styles/app_styles";
import {styles} from '../../styles.js';
import TableRow from "../../../../components/Basic/Tables/TableRow";
import {formatDate, formatTime} from "../../../../helpers/time";
import CustomButton from "../../../../components/Basic/Button/CustomButton";


class ReoReviewScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "rowColumns": [
                {key: "address", title: "Address"},
                {key: "post_code", title: "Post Code"}, {key: "suburb", title: "Suburb"},
                {key: "state", title: "state"}, {key: "mesh", title: "mesh"},
                {key: "trench_mesh", title: "Trench Mesh"}, {key: "stock_bar", title: "Stock Bar"},
                {key: "trench_mesh", title: "Trench Mesh"}, {key: "starter_bar_mesh", title: "Starter Bar Mesh"},
                {key: "ligatures", title: "Ligatures"}, {key: "swimming_pool_reo", title: "Swimming Pool Reo"},
                {key: "accessories", title: "Accessories"}, {key: "accessories_type", title: "Accessories Type"},
                {key: "expansion_joints", title: "Expansion Joints"}, {key: "bar_chairs", title: "Bar Chairs"},
                {key: "plastic_membrance", title: "Plastic Membrane and Tape"}, {key: "wire", title: "Wire"},
                {key: "delivery_date", title: "Date Preference 1", format: formatDate},
                {key: "delivery_date1", title: "Date Preference 2", format: formatDate},
                {key: "delivery_date2", title: "Date Preference 3", format: formatDate},
                {key: "time1", title: "Time Preference 1", format: formatTime},
                {key: "time2", title: "Time Preference 2", format: formatTime},
                {key: "time3", title: "Time Preference 3", format: formatTime},
                {key: "time_difference_deliveries", title: "Time Between  Deliveries"},
                {key: "urgency", title: "Time Urgency"}, {key: "site_call", title: "On Site/On Call"},
            ]
        };
        this.nextActions = this.nextActions.bind(this);
    }

    nextActions() {
        this.props.navigation.navigate("Reo Review Instructions");
    }

    render() {
        let order = this.props.order;
        return (
            <AppBackground loading={this.props.app.get("loading")}>
                <ScrollView>
                    <AppHeader/>
                    <Content contentContainerStyle={[styles.content]}>
                        <SubHeader iconName="search" title="Review Order"/>
                        <View style={[appStyles.bgWhite, appStyles.p_15]}>
                            <TableRow rowData={order} rowColumns={this.state.rowColumns}/>
                        </View>
                        <View style={appStyles.my_5}>
                            <CustomButton mainBtnColor={appStyles.bgBluelgt} btnText={"Next"}
                                          onPress={() => this.nextActions()}/>
                        </View>
                    </Content>
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
