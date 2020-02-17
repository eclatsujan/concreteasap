import * as React from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {Grid, Col, Row, View, Button, Text, Header, Content, Right, Body,
        Left, Icon, Footer, FooterTab, Title} from 'native-base';
import {DrawerActions} from 'react-navigation-drawer';

import {styles} from '../styles.js';

//App Component
import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import HomeButton from '../../../components/Button/HomeButton'
import AppFooter from "../../../components/Footer/AppFooter";
import {actions} from "../../../store/modules";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";


class AcceptedOrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            tableHead: ['Order', 'Status', 'Actions'],
            tableData: [
                {
                    "id": 200,
                    "status": "open"
                },
                {
                    "id": 202,
                    "status": "open"
                },
                {
                    "id": 203,
                    "status": "close"
                },
                {
                    "id": 204,
                    "status": "close"
                }
            ],
        };

        this._alertIndex = this._alertIndex.bind(this);

        this.backButton=this.backButton.bind(this);
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getAcceptedOrder();
            this.interval = setInterval(this.props.getAcceptedOrder, 10000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }

    _alertIndex(id) {
        this.props.navigation.navigate("ViewBids", {itemId: id});
    }

    displayTableHeader() {
        return (
            <Row>
                <Grid style={{marginTop: 20, borderBottomWidth: 2, borderBottomColor: 'grey',}}>
                    {this.state.tableHead.map((rowData, index) => (
                        <Col key={index} style={{marginLeft: 10,}}>
                            <Text>{rowData}</Text>
                        </Col>
                    ))}
                </Grid>
            </Row>
        );


    }

    displayTableData() {
        return this.state.tableData.map((rowData, index) => (
            <Row key={index}>
                <Grid style={{marginTop: 10}}>
                    <Col style={{borderBottomWidth: 2, borderBottomColor: '#f2f2f2', marginLeft: 10}}>
                        <Text>{rowData.id}</Text>
                    </Col>
                    <Col style={{borderBottomWidth: 2, borderBottomColor: '#f2f2f2',}}>
                        <Text>{rowData.status}</Text>
                    </Col>
                    <Col style={{borderBottomWidth: 2, borderBottomColor: '#f2f2f2', paddingBottom: 10}}>
                        <Button
                            disabled={rowData.status == "close" ? true : false}
                            onPress={() => this._alertIndex(rowData.id)}>
                            <Text>Bid Now</Text>
                        </Button>
                    </Col>
                </Grid>
            </Row>
        ));
    }

    render() {

        return (
            <AppBackground>
                <AppHeader />
                <Content contentContainerStyle={styles.content}>
                    <ScrollView>
                        <Text style={{textAlign: "center", fontSize: 20, fontWeight: 'bold',}}>View Accepted
                            Orders</Text>
                        {this.displayTableHeader()}
                        {this.displayTableData()}
                    </ScrollView>
                </Content>
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AcceptedOrderDetail));
