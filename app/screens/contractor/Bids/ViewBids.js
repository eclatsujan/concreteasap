import * as React from 'react';
import {ScrollView} from 'react-native';
import {Col, Row, Button, Text, Content, Footer, FooterTab} from 'native-base';

//Third Party
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/AppHeader'
import SubHeader from '../../../components/SubHeader'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../assets/app_styles";
import {actions} from "../../../store/modules";
import {ActivityIndicator} from "react-native-paper";

class ViewBids extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            params: props.navigation.state.params,
            tableHead: ['Bids', '$', 'Company', ''],
            tableData: [],
        };
    }

    componentWillMount() {
        let bids = this.state.params.bids;
        this.setState({tableData: bids});
    }

    displayTableHeader() {
        return (
            <Row style={appStyles.borderBottom}>
                {this.state.tableHead.map((rowData, index) => (
                    <Col key={index} style={index === this.state.tableHead.length - 1 ? appStyles.w_35 : null}>
                        <Text style={appStyles.upperCase}>{rowData}</Text>
                    </Col>
                ))}
            </Row>
        );
    }

    acceptBid(bid_id) {
        this.props.acceptBid(bid_id);
    }

    rejectBid(bid_id){
        this.props.rejectBid(bid_id);
    }

    displayTableData() {
        return this.state.tableData.map((rowData, index) => (
            <Row key={index} style={[appStyles.borderBottom, appStyles.py_10, appStyles.verticalCenter]}>
                <Col>
                    <Text>{rowData.id}</Text>
                </Col>
                <Col>
                    <Text>{rowData.price}</Text>
                </Col>
                <Col>
                    <Text>{rowData["user_id"]}</Text>
                </Col>
                <Col style={appStyles.w_35}>
                    <Row>
                        <Col>
                            <Button
                                style={[appStyles.bgBlack, appStyles.borderRadiusDefault, appStyles.horizontalCenter, appStyles.w_90]}
                                onPress={() => {
                                    this.acceptBid(rowData["id"])
                                }}>
                                <Text style={appStyles.ft_small}>Accept</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button danger
                                    style={[appStyles.borderRadiusDefault, appStyles.horizontalCenter, appStyles.w_90]}
                                    onPress={() => {
                                        this.rejectBid(rowData["id"])
                                    }}>
                                <Text style={appStyles.ft_small}>Reject</Text>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        ));
    }

    render() {
        let app=this.props.app.toJS();
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="user" title="View Bids"/>
                    <Content contentContainerStyle={[appStyles.bgWhite, appStyles.p_5]}>
                        {this.displayTableHeader()}
                        {!app.loading?this.displayTableData():<ActivityIndicator size="large" />}
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
        acceptBid: (bid_id) => {
            // console.log(actions);
            return dispatch(actions.order.acceptBid(bid_id))
        },
        rejectBid: (bid_id) => {
            return dispatch(actions.order.rejectBid(bid_id));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        order: state.get("order")
    };
};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ViewBids));
