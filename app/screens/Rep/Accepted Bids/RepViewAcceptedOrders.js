import * as React from 'react';
import {ScrollView} from 'react-native';
import { Grid,Col,Row,View, Button, Text,Content,Footer,FooterTab } from 'native-base';
import {connect} from "react-redux";

import { actions } from '../../../store';
import {appStyles} from "../../assets/app_styles";
import AppHeader from "../../../components/AppHeader";
import AppBackground from "../../../components/AppBackground";

class RepViewAcceptedOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order #', 'Date', 'Status', 'Actions'],
            tableData: [
                {
                    "id":200,
                    "Date":"2019-03-12",
                    "Status":"completed",
                },
                {
                    "id":202,
                    "Date":"2019-03-12",
                    "Status":"completed",
                },
                {
                    "id":203,
                    "Date":"2019-03-12",
                    "Status":"completed",
                },
                {
                    "id":204,
                    "Date":"2019-03-12",
                    "Status":"completed",
                }
            ],
        }
    }

    componentWillMount(){
        this.props.getAllOrder();
    }

    _alertIndex(id) {
        // console.log("bids:", id);
        this.props.navigation.navigate("OrderStatus",{id:id});
    }

    displayTableData(){
        return this.state.tableData.map((rowData, index) => (
            <Grid key={index}>
                <Row style={[appStyles.paddingYDefault]}>
                    <Col style={appStyles.flex1}>
                        <Text>{rowData.id}</Text>
                    </Col>
                    <Col style={appStyles.flex3}>
                        <Text>{rowData.Status}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button style={appStyles.btnGray} onPress={() => this._alertIndex(rowData.id)}>
                            <Text style={[appStyles.txtCenter,appStyles.btnInverseColor]}>View Details</Text>
                        </Button>
                    </Col>
                </Row>
            </Grid>
        ));
    }

    render(){
        return (
            <AppBackground>
              <AppHeader/>

              <Content>
                  <ScrollView style={[appStyles.bgWhite]}>
                      <View style={[appStyles.bgWhite,appStyles.marginAppDefault,appStyles.paddingAppDefault]}>
                          <Row>
                              <Col>
                                  <Text>ORDER NO.</Text>
                              </Col>
                              <Col style={appStyles.flex3}>
                                  <Text>STATUS</Text>
                              </Col>
                          </Row>
                          {this.displayTableData()}
                      </View>
                  </ScrollView>
              </Content>
              <Footer style={{marginBottom:30}}>
                  <FooterTab>
                    <Button style={appStyles.button,appStyles.buttonPrimary} onPress={()=>this.props.navigation.navigate("Home")}>
                        <Text style = {appStyles.buttonBlack}>Back to Home</Text>
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
            return dispatch(actions.order.getAllOrder())
        }
    }
};

const mapStateToProps = (state) => {
    // const {order}=state;
    return {
        order:state.get("order")
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(RepViewAcceptedOrders);
