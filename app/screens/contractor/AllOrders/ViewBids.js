import * as React from 'react';
import {ScrollView, TouchableWithoutFeedback} from 'react-native';
import {View, Content, Icon} from 'native-base';

//Third Party
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";
import {ActivityIndicator} from "react-native-paper";

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";
import {actions} from "../../../store/modules";
import EmptyTable from "../../../components/Tables/EmptyTable";
import CustomTable from "../../../components/Tables/CustomTable";
import AppFooter from "../../../components/Footer/AppFooter";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";


class ViewBids extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            params: props.navigation.state.params,
            rowHeaders: ['Bids', 'Price m3', 'Company', ''],
            rowColumns: ["id", "price", "user.detail.company"],
            emptyMessage: "There is no bids placed at the moment."
        };
        // this.loadOrderBids = this.loadOrderBids.bind(this);
        this.showComponentButton = this.showComponentButton.bind(this);

        this.focusListener = this.props.navigation.addListener('didFocus', () => {

            this.interval=setInterval(this.props.getContractorOrders,6000);
        });

        this.blurListener=this.props.navigation.addListener('didBlur',()=>{
            clearInterval(this.interval);
        });
        this.acceptBid=this.acceptBid.bind(this);
    }

    componentDidMount() {
        this.props.getContractorOrders();
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }

    acceptBid(bid_id,order_id) {
        let order = this.getOrder(order_id);
        this.props.navigation.navigate("OrderBidStatus", {
            bid_id,
            order
        });
    }

    rejectBid(bid_id, order_id) {
        this.props.rejectBid(bid_id, order_id);
    }

    renderEmptyRow() {
        return (
            <EmptyTable message={this.state.emptyMessage}/>
        );
    }

    showComponentButton(rowData) {
        return (
            <View style={[appStyles.flexRow, appStyles.justifyRight]}>
                <View style={appStyles.pr_15}>
                    <TouchableWithoutFeedback
                        underlayColor="white"
                        onPress={() => {
                            this.acceptBid(rowData.get("id"),rowData.get("order_id"))
                        }}>
                        <Icon name={"check-circle"} style={appStyles.colorSuccess} type={"FontAwesome5"}/>
                    </TouchableWithoutFeedback>

                </View>
                <View>
                    <TouchableWithoutFeedback
                        underlayColor="white"
                        onPress={() => {
                            this.rejectBid(rowData["id"], rowData["order_id"])
                        }}>
                        <Icon name={"times-circle"} style={appStyles.colorDanger} type={"FontAwesome5"}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    showBidOutput(bids,length){
        return length!==0?<CustomTable bgStyle={[appStyles.bgWhite]}
                                rowHeaders={this.state.rowHeaders}
                                rowData={bids} rowColumns={this.state.rowColumns}
                                colButtonComponent={this.showComponentButton}/>
                            :<EmptyTable message={this.state.emptyMessage}/>
    }

    getOrder(order_id){
        return this.props.order.get("pending_orders").find((order) => order.get("id") === order_id);
    }

    render() {
        let order_id = this.state.params.order_id;
        let order = this.getOrder(order_id);
        let bids = order?.get("bids") ? order.get("bids") : [];
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="View Bids"/>
                    <Content>
                        {this.props.app.get("loading")?<SkeletonLoading />
                        :this.showBidOutput(bids,bids?.size)}
                    </Content>
                </ScrollView>
                <AppFooter/>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        rejectBid: (bid_id, order_id) => {
            return dispatch(actions.order.rejectBid(bid_id, order_id));
        },
        getContractorOrders: () => {
            return dispatch(actions.order.getContractorOrders())
        },
        appLoading: () => {
            return dispatch(actions.app.loading())
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
