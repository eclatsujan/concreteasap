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
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";

class BidMessageHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyMessage: "There are no Bid Message right now.",
            pricePer: "",
            total: 0,
            quantity: 0,
        };
        this.setPerPrice = this.setPerPrice.bind(this);
        this.getSingleBid= this.getSingleBid.bind(this);

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.interval = setInterval(() => {
                this.props.getRepAcceptedBids();
            }, 6000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', (payload) => {
            clearInterval(this.interval);
        });
    }

    showContent(message) {
        let price=!message?.get("price")?0:parseFloat(message?.get("price"));
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
        // const {params} = this.props.navigation.state;
        // let bid=this.getSingleBid(params.bid_id);
        // let message = null;
        // if(bid){
        //     message=bid.get("order").get("message");
        // }
        if(price!==""){
            price = parseFloat(price);
            this.setState({pricePer: price});
        }
        else{
            this.setState({pricePer:""});
        }

    }

    showInput(message) {
        let price = this.state.pricePer.toString();
        let btnStatus = this.state.pricePer==="";
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

    getSingleBid(bid_id) {
        let accepted_bids = this.props.bid.get("accepted_bids").get("data");
        return accepted_bids.find((bid) => bid.get("id") === bid_id);
    }

    render() {
        const {params} = this.props.navigation.state;
        let bid=this.getSingleBid(params.bid_id);
        let message = null;
        if(bid){
            message=bid.get("order").get("message");
        }

        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="accepted-order" title={"Order Message"}/>
                    <Content contentContainerStyle={styles.content}>
                        {this.props.app.get("loading") ? <SkeletonLoading/>:this.showContent(message)}
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
        },
        getRepAcceptedBids: async () => {
            return await dispatch(actions.bid.getRepAcceptedBids())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        bid: state.get("bid")
    };
};



export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(BidMessageHome));

