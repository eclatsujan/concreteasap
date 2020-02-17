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
import MessagePriceView from "../../../components/Rep/Message/MessagePriceView";

class BidMessageHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyMessage: "There are no Bid Message right now.",
            pricePer: "",
            total: 0,
            quantity: 0,
        };
        this.getSingleBid = this.getSingleBid.bind(this);
        this.setMessagePrice = this.setMessagePrice.bind(this);

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getRepAcceptedBids();
            this.interval = setInterval(() => {
                this.props.getRepAcceptedBids();
            }, 10000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', (payload) => {
            clearInterval(this.interval);
        });
    }

    setMessagePrice(message_id, price) {
        let bid = this.getSingleBid(this.props.navigation.getParam("bid_id"));
        this.props.placeMessagePrice(price, bid.get("id"), message_id);
    }

    showContent(messages) {

        return messages?.map((message, index) => {
            return (
                <MessagePriceView loading={false} key={index} message_id={message?.get("id")}
                                  quantity={message?.get("quantity")}
                                  price={message?.get("price")} status={message?.get("status")}
                                  setPrice={this.setMessagePrice}/>
            );
        });
    }

    getSingleBid(bid_id) {
        let accepted_bids = this.props.bid.get("accepted_bids").get("data");
        return accepted_bids.find((bid) => bid.get("id") === bid_id);
    }

    showMessageContent(messages) {
        return !messages || messages?.size === 0 ?
            <EmptyTable message={this.state.emptyMessage}/> : this.showContent(messages)
    }

    render() {
        const {params} = this.props.navigation.state;
        let bid = this.getSingleBid(params.bid_id);
        let messages = null;
        if (bid) {
            messages = bid.get("order").get("message");
        }
        return (
            <AppBackground loading={this.props.app.get("loading")} enableKeyboard>
                <ScrollView keyboardShouldPersistTaps={"always"}>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="accepted-order" title={"Order Message"}/>
                    <View>
                        {typeof bid === "undefined" ?
                                <View>
                                    <EmptyTable message={"Job has been already completed or cancelled."}/>
                                </View>
                                : this.showMessageContent(messages)}
                    </View>
                </ScrollView>
            </AppBackground>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        placeMessagePrice: (pricePer, order_id, message_id) => {
            return dispatch(actions.bid.placeMessagePrice(pricePer, order_id, message_id))
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

