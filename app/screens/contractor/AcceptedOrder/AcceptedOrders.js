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
import HomeButton from "../../../components/Button/HomeButton";
import ButtonIcon from "../../../components/Button/ButtonIcon";

class AcceptedOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Status', ''],
            tableData: [],
            rowHeaders: ['Order No.', 'Status'],
            rowColumns: ["id", "status"],
        };
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // this.setState({loading: true});
            this.props.getAcceptedOrder();
        });
        this._alertIndex=this._alertIndex.bind(this);
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    _alertIndex(order) {
        // console.log(order["id"]);
        this.props.navigation.navigate("DayOfPour",{
            order_id:order["id"]
        });
    }

    displayTableHeader() {
        return (
            <Row style={[appStyles.borderBottom, appStyles.paddingYDefault]}>
                {this.state.tableHead.map((rowData, index) => (
                    <Col key={index}>
                        <Text style={[appStyles.upperCase,appStyles.baseSmallFontSize]}>{rowData}</Text>
                    </Col>
                ))}
            </Row>
        );
    }

    displayTableData() {
        let order=this.props["order"].toJS();
        return order.accepted_orders.map((rowData, index) => (
            <Row key={index} style={[appStyles.borderBottom, appStyles.py_10]}>
                <Col>
                    <Text style={[appStyles.baseSmallFontSize,appStyles.arialFont]}>
                        {rowData.id}
                    </Text>
                </Col>
                <Col>
                    <Text style={[appStyles.baseSmallFontSize,appStyles.arialFont]}>{rowData.status}</Text>
                </Col>
                <Col style={[appStyles.verticalCenter,appStyles.baseSmallFontSize]}>
                    <View>
                        <ButtonIcon small btnText={"View"} onPress={()=>{
                            this._alertIndex(rowData.id)
                        }} />
                    </View>

                </Col>
            </Row>
        ));
    }

    render() {
        let order=this.props["order"].toJS();
        return (
            <AppBackground alignTop noKeyBoard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Accepted Orders" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={appStyles.bottomMarginDefault}>
                        <View style={[appStyles.bgWhite, appStyles.paddingAppDefault]}>
                            <CustomTable bgStyle={[appStyles.bgWhite, appStyles.p_15]}
                                         rowHeaders={this.state.rowHeaders}
                                         rowData={order["accepted_orders"]} rowColumns={this.state.rowColumns}
                                         colButtonComponent={this.showComponentButton}
                                         customRowComponent={this.showCustomRow}
                                         buttonText="View" onPress={this._alertIndex}/>
                        </View>
                    </Content>
                </ScrollView>
                <Footer>
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
        getAcceptedOrder: () => {
            return dispatch(actions.order.getContractorAcceptedOrder())
        },
    }
};

const mapStateToProps = (state) => {
    return {
        order:state.get("order"),
        app:state.get("app")
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AcceptedOrders));

// export default ;