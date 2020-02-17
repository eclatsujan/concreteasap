import * as React from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {Col, Row, View, Button, Text, Content, Icon, Footer, FooterTab} from 'native-base';

//Redux
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";

//Custom Component
import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'
import CustomTable from "../../../components/Tables/CustomTable";

//styles
import {appStyles} from "../../../../assets/styles/app_styles";

import {actions} from "../../../store/modules";
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";
import AppFooter from "../../../components/Footer/AppFooter";

class AcceptedOrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Status', ''],
            tableData: [],
            rowHeaders: ['Job No.', 'Status'],
            rowColumns: ["job_id", "status"],
            errorMsg: "There is no accepted orders."
        };

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getAcceptedOrder();
            this.interval = setInterval(this.props.getAcceptedOrder, 10000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });

        this._alertIndex = this._alertIndex.bind(this);
    }

    componentDidMount() {
        this.props.getAcceptedOrder();
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }

    _alertIndex(order) {
        console.log(order.get("id"));
        this.props.navigation.navigate("DayOfPour", {
            order_id: order.get("id"),
            order_type: "accepted_orders",
            backRoute:this.props.navigation.state.routeName
        });
    }

    render() {
        let app = this.props["app"];
        let order = this.props["order"];
        let accepted_order = order?.get("accepted_orders")?.get("data");
        return (
            <AppBackground alignTop noKeyBoard loading={this.props.app.get("loading")}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Accepted Orders" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={appStyles.bottomMarginDefault}>
                        <View style={[appStyles.bgWhite, appStyles.paddingAppDefault]}>
                            {<CustomTable errorMsg={this.state.errorMsg} bgStyle={[appStyles.bgWhite]}
                                          rowHeaders={this.state.rowHeaders}
                                          rowData={accepted_order} rowColumns={this.state.rowColumns}
                                          colButtonComponent={this.showComponentButton}
                                          customRowComponent={this.showCustomRow}
                                          buttonText="View" onPress={this._alertIndex}/>}
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAcceptedOrder: () => {
            return dispatch(actions.order.getContractorAcceptedOrder())
        },
        appLoading: () => {
            return dispatch(actions.app.loading());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        order: state.get("order"),
        app: state.get("app")
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AcceptedOrderList));

// export default ;