import * as React from 'react';
import {Content, View} from 'native-base';
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import {actions} from "../../../store/modules";
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";
import CustomTable from "../../../components/Tables/CustomTable";
import {appStyles} from "../../../../assets/styles/app_styles";
import ButtonIcon from "../../../components/Button/ButtonIcon";
import {BackHandler} from "react-native";
import navigationHelper from "../../../helpers/navigationHelper";
import EmptyTable from "../../../components/Tables/EmptyTable";


class pourDayList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rowHeaders: ['Job No.', 'Status', 'Suburb'],
            rowColumns: ["job_id", "status", 'order_concrete.suburb'],
            emptyMsg:"There is no day of orders today."
        };

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getPourOrders();
            this.interval = setInterval(() => {
                this.props.getPourOrders();
            }, 10000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });
        this.showCustomRow = this.showCustomRow.bind(this);
    }

    componentDidMount() {
        this.props.getPourOrders();
    }

    handleBackButton() {

        navigationHelper.goBack();
        return true;
    }

    showCustomRow(order) {
        return (
            <View style={appStyles.mt_5}>
                <View style={appStyles.w_50}>
                    <ButtonIcon small btnText={"View Order"}
                                onPress={() => {
                                    this.props.navigation.navigate("DayOfPour", {
                                        order_id: order.get("id"),
                                        order_type: "pour_orders",
                                        backRoute: "pourDayList"
                                    });
                                }}/>
                </View>

            </View>
        );
    }

    showComponentButton() {
    }

    _alertIndex(rowData) {

    }


    showContent(orders) {
        console.log(orders);
        return orders?.size>0?<CustomTable bgStyle={[appStyles.bgWhite]}
                         rowHeaders={this.state.rowHeaders}
                         rowData={orders} rowColumns={this.state.rowColumns}
                         colButtonComponent={this.showComponentButton}
                         customRowComponent={this.showCustomRow}
                         buttonText="View" onPress={this._alertIndex}/>:<EmptyTable message={this.state.emptyMsg} />;
    }


    render() {
        let orders = this.props.orders;
        let app = this.props.app;
        let pour_orders = orders?.get("pour_orders")?.get("data");
        return (
            <AppBackground loading={app.get("loading")}>
                <AppHeader/>
                <Content>
                    <SubHeader iconName="truck" iconType="ConcreteASAP" title="Day of Pour"/>
                    <View>
                        {this.showContent(pour_orders)}
                    </View>
                </Content>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPourOrders: () => {
            return dispatch(actions.order.getContractorAllPour());
        },
        createOrder: (order) => {
            return dispatch(actions.order.createOrder(order))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        orders: state.get("order")
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(pourDayList));