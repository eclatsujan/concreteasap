import * as React from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';
import {Grid, Col, Row, View, Button, Text, Content, Footer, FooterTab} from 'native-base';
import {connect} from "react-redux";

import {actions} from '../../../store';
import {appStyles} from "../../assets/app_styles";
import AppHeader from "../../../components/Headers/AppHeader";
import AppBackground from "../../../components/AppBackground";
import SubHeader from "../../../components/Headers/SubHeader";
import HomeButton from "../../../components/Button/HomeButton";
import CustomTable from "../../../components/Tables/CustomTable";

class RepPastBids extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowHeaders: ['Order No.', 'Date', 'Status'],
            rowColumns: ["id", "order_concrete.suburb", "order_concrete.quantity"]
        };
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getAllOrder();
        });
    }

    componentWillMount() {
        this.props.getAllOrder();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            // this.props.getBiddingOrders();
            console.log("ok");
        }
    }

    _showDetails(id) {
        this.props.navigation.navigate("OrderStatus", {id: id});
    }

    render() {
        let app = this.props.app.toJS();
        let order = this.props.order.toJS();
        return (
            <AppBackground loading={app.loading}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title={"Accepted Orders"} iconType="ConcreteASAP" iconName="place-order"/>
                    <Content>
                        <View style={[appStyles.bgWhite, appStyles.marginAppDefault, appStyles.paddingAppDefault]}>
                            <CustomTable isLoading={app.loading} bgStyle={[appStyles.bgWhite, appStyles.p_15]}
                                         rowHeaders={this.state.rowHeaders}
                                         rowData={order["bidding_orders"]} rowColumns={this.state.rowColumns}
                                         buttonText="View Details" onPress={this._showDetails}/>
                        </View>
                    </Content>
                </ScrollView>
                <Footer style={{marginBottom: 30}}>
                    <FooterTab>
                        <Button style={[appStyles.button, appStyles.buttonPrimary]}
                                onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={appStyles.buttonBlack}>Back to Home</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllOrder: () => {
            return dispatch(actions.order.getRepAcceptedOrders())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        order: state.get("order")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RepPastBids);
