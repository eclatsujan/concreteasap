import * as React from 'react';
import {ScrollView, TextInput} from 'react-native';
import {Button, Text, Content, Footer, FooterTab, View, Row, Col, Item} from 'native-base';
import {styles} from '../styles.js';

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import {appStyles} from "../../../../assets/styles/app_styles";
import EmptyTable from "../../../components/Tables/EmptyTable";
import SubHeader from "../../../components/Headers/SubHeader";
import {actions} from "../../../store/modules";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import CustomTable from "../../../components/Tables/CustomTable";

class BidMessageHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyMessage: "There are no Bid Message right now.",
            pricePer: 0,
            total: 0,
            quantity: 0,
        };
        this.setPerPrice = this.setPerPrice.bind(this);
    }

    showContent(message) {
        let price=!message.get("price")?0:parseFloat(message.get("price"));
        // console.log(message);
        return !message ? <EmptyTable message={this.state.emptyMessage}/> : (
            <View style={[appStyles.bgWhite, appStyles.p_10]}>
                <View>
                    <Row style={[appStyles.borderBottom2, appStyles.py_5]}>
                        <Col><Text style={appStyles.boldFont}>Quantity (m3):</Text></Col>
                        <Col><Text>{message.get("quantity")}</Text></Col>
                    </Row>
                </View>
                <View>
                    {price<=0 ? this.showInput(message) :this.showLabel(message)}
                </View>
            </View>

        );
    }

    showLabel(message){
        return (
            <View>
                <Row style={[appStyles.borderBottom2, appStyles.py_5]}>
                    <Col><Text style={appStyles.boldFont}>Total Price</Text></Col>
                    <Col><Text>{message.get("price")}</Text></Col>
                </Row>
                <Row style={[appStyles.borderBottom2, appStyles.py_5]}>
                    <Col><Text style={appStyles.boldFont}>Status</Text></Col>
                    <Col><Text>{message.get("status")}</Text></Col>
                </Row>
            </View>
        );
    }

    setPerPrice(price) {
        const {params} = this.props.navigation.state;
        const message = params ? params.message : null;
        let total = 0;
        if (price !== "") {
            let quantity = parseFloat(message.get("quantity"));
            price = parseFloat(price);
            total = quantity * price;
        }
        this.setState({total});
        this.setState({pricePer: price});
    }

    showInput(message) {
        let price = this.state.pricePer.toString();
        let btnStatus = this.state.total === 0;
        return (
            <View>
                <Row style={[appStyles.mt_5, appStyles.verticalCenter, appStyles.borderBottom2, appStyles.pb_5]}>
                    <Col>
                        <Text
                            style={[appStyles.upperCase, appStyles.boldFont, appStyles.baseSmallFontSize]}>
                            Price total
                        </Text>
                    </Col>
                    <Col>
                        <Item style={[appStyles.loginInput, appStyles.p_10, appStyles.border2]} regular>
                            <TextInput keyboardType={'numeric'} placeholder="ENTER BID AMOUNT"
                                       style={appStyles.baseFont}
                                       value={price} onChangeText={this.setPerPrice}/>
                        </Item>
                    </Col>
                </Row>
                <Row style={[appStyles.mt_5, appStyles.verticalCenter]}>
                    <Button disabled={btnStatus} style={appStyles.horizontalCenter}
                            onPress={() => {
                                this.props.placeMessagePrice(price, message.get("order_id"));
                            }}>
                        <Text style={appStyles.colorBlack}>Send Price</Text>
                    </Button>
                </Row>
            </View>
        );
    }

    render() {
        const {params} = this.props.navigation.state;
        const message = params ? params.message : null;

        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="accepted-order" title={"Order Message"}/>
                    <Content contentContainerStyle={styles.content}>
                        {this.showContent(message)}
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
        placeMessagePrice: (pricePer, order_id) => {
            return dispatch(actions.bid.placeMessagePrice(pricePer, order_id))
        }
    }
};


export default withNavigation(connect(null, mapDispatchToProps)(BidMessageHome));

