import * as React from 'react';
import {Animated} from 'react-native';
import {View, Row, Col, Text, Icon} from 'native-base';
import ButtonIcon from "../../Button/ButtonIcon";
import {appStyles} from "../../../../assets/styles/app_styles";
import {actions} from "../../../store/modules";
import {withNavigationFocus} from "react-navigation";
import {connect} from 'react-redux';

class OrderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(1),
            transformScale: new Animated.Value(1),
            height: new Animated.Value(1)
        };
        this.closeAnimation = this.closeAnimation.bind(this);
    }

    componentDidMount() {

    }

    getColor(status) {
        let status_colors = {"Complete": "#2E7400", "Cancelled": "#FF0000"};
        let color = status_colors[status] ? status_colors[status] : "#000000";
        return {color};
    }

    closeAnimation(order) {
        this.props["onArchiveHandler"](order);

    }

    render() {
        let pending_data = this.props.pending_order?.get("data");
        let order = pending_data?.get("orders")?.get(this.props.order_id);

        let pending_order_bids = pending_data?.get("bids");
        let order_concrete = pending_data?.get("order_concrete")?.get(order?.get("order_concrete").toString());

        let order_id = order?.get("id");
        let jobId = order?.get("job_id");
        let status = order?.get("status");
        let order_bids = order?.get("bids");
        let height = this.state.height._value === 1 ? "auto" : this.state.height;

        return (
            <Animated.View
                style={[{
                    opacity: this.state.opacity,
                    height
                }, appStyles.py_10, appStyles.borderBottom, appStyles.mx_10]}>
                <Row>
                    <View style={[appStyles.flexRow, appStyles.pb_5]}>
                        <View style={[appStyles.flexRow, {alignItems: "flex-end"}]}>
                            <Text style={[appStyles.baseSmallFontSize, appStyles.upperCase, appStyles.boldFont]}>
                                Order ID:#
                            </Text>
                            <Text
                                style={[appStyles.arialFont, appStyles.baseSmallFontSize]}>{jobId}</Text>
                            <Text
                                style={[appStyles.baseSmallFontSize, appStyles.pl_20, appStyles.upperCase, appStyles.boldFont]}>
                                Status:
                            </Text>
                            <Text
                                style={[appStyles.pl_5, appStyles.baseSmallFontSize, appStyles.arialFont, this.getColor(status)]}>
                                {status}
                            </Text>
                        </View>
                    </View>
                </Row>
                <View style={[appStyles.flex1, appStyles.flexRow]}>
                    <View style={[appStyles.flexRow, appStyles.flexWrap, appStyles.py_5, appStyles.w_90]}>
                        <View style={[appStyles.pr_5, appStyles.mb_10]}>
                            <ButtonIcon small
                                        btnText={this.props["buttonViewText"]}
                                        onPress={() => {
                                            this.props["onBidHandler"](order_id)
                                        }}/>
                        </View>
                        <View style={[appStyles.pr_5, appStyles.mb_10]}>
                            <ButtonIcon small
                                        btnText={"View Details"}
                                        onPress={() => {
                                            this.props["onDetailHandler"] ? this.props["onDetailHandler"](order_concrete) : null;
                                        }}/>
                        </View>
                        <View style={appStyles.pr_5}>
                            <ButtonIcon small
                                        btnText={"Archive"}
                                        iconName={"archive"}
                                        btnBgColor={"#707070"}
                                        onPress={() => {
                                            this.closeAnimation(order);
                                        }}/>
                        </View>
                    </View>
                    <View style={appStyles.w_10}>
                        <View
                            style={[appStyles.smallCircleNoBorder, appStyles.bgPrimary, appStyles.justifyItemsCenter]}>
                            <Text style={[appStyles.boldFont, appStyles.ft_20]}>
                                {order_bids?.size}
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getContractorPendingOrders: () => {
            return dispatch(actions.order.pendingOrder.fetchPendingOrders());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        pending_order: state.get("pending_order")
    };
};


export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(OrderView));