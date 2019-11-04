import * as React from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {Col, Row, View, Button, Text, Content, Icon, Footer, FooterTab} from 'native-base';

//Redux
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";

//Custom Component
import AppBackground from '../../../../components/AppBackground';
import AppHeader from '../../../../components/AppHeader'
import SubHeader from '../../../../components/SubHeader'

//styles
import {appStyles} from "../../../assets/app_styles";
import {actions} from "../../../../store/modules";

class AcceptedOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Status', ''],
            tableData: [],
        };
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // this.setState({loading: true});
            this.props.getAcceptedOrder();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    _alertIndex(id) {
        this.props.navigation.navigate("DayOfPour",{
            order_id:id
        });
    }

    displayTableHeader() {
        return (
            <Row style={[appStyles.borderBottom, appStyles.pb_15]}>
                {this.state.tableHead.map((rowData, index) => (
                    <Col key={index} style={{marginLeft: 10,}}>
                        <Text>{rowData}</Text>
                    </Col>
                ))}
            </Row>
        );
    }

    displayTableData() {
        let order=this.props["order"].toJS();
        return order.accepted_orders.map((rowData, index) => (
            <Row key={index} style={[appStyles.borderBottom, appStyles.py_10]}>
                <Col><Text>{rowData.id}</Text></Col>
                <Col><Text>{rowData.status}</Text></Col>
                <Col>
                    <TouchableOpacity onPress={() => this._alertIndex(rowData.id)}>
                        <View style={appStyles.flexRow}>
                            <View style={appStyles.w_25}>
                                <Icon type="FontAwesome5" name="eye" style={appStyles.ft_20}/>
                            </View>
                            <View style={appStyles.w_75}><Text>View Bids</Text></View>
                        </View>
                    </TouchableOpacity>
                </Col>
            </Row>
        ));
    }

    render() {
        return (
            <AppBackground alignTop noKeyBoard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Accepted Orders" iconName="user"/>
                    <Content>
                        <View style={[appStyles.bgWhite, appStyles.p_5]}>
                            {this.displayTableHeader()}
                            {this.displayTableData()}
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
            return dispatch(actions.order.getAcceptedOrder())
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