import * as React from 'react';
import {ScrollView} from 'react-native';
import {Button, Content, Text, View} from 'native-base';

import {connect} from "react-redux";
import {withNavigation} from "react-navigation";

import AppHeader from "../../../components/Headers/AppHeader";
import AppBackground from "../../../components/App/AppBackground";
import SubHeader from "../../../components/Headers/SubHeader";
import CustomTable from '../../../components/Basic/Tables/CustomTable'
import AppFooter from "../../../components/App/Footer/AppFooter";


import {appStyles} from "../../../../assets/styles/app_styles";
import {actions} from "../../../store/modules";
import EmptyTable from "../../../components/Basic/Tables/EmptyTable";
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";
import {getNested} from "../../../helpers/app";
import StatusRow from "../../../components/Basic/Tables/StatusRow";


class AcceptedBidList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowHeaders: ['Job No', 'Suburb', 'Cubic m3'],
            rowColumns: ["order.job_id", "order.order_concrete.suburb", "order.order_concrete.quantity"],
            loading: true,
            emptyMessage: "There are no Accepted Orders right now.",
            reRender: false
        };

        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            this.props.getRepAcceptedBids();
            this.interval = setInterval(() => {
                this.props.getRepAcceptedBids();
            }, 10000);
        });

        this.blurListener = this.props.navigation.addListener('willBlur', (payload) => {
            clearInterval(this.interval);
        });

        this._alertIndex = this._alertIndex.bind(this);

        this.showCustomRow = this.showCustomRow.bind(this);
    }

    componentDidMount() {
        this.props.getRepAcceptedBids();
        this.setState({reRender: true});
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }

    _alertIndex(bid) {
        let bid_id=bid.get("id");
        this.props.navigation.navigate("Accepted Bid Detail", {bid_id});
    }

    showComponentButton() {

    }

    showCustomRow(rowData) {
        let status=rowData?.get("order")?.get("status");
        let quantity=rowData?.get("order")?.get("order_concrete")?.get("quantity");

        quantity=typeof quantity!==undefined?parseFloat(quantity):0;
        let price=rowData?.get("price");
        price=typeof price!==undefined?parseFloat(price):0;

        let total=price*quantity;

        return (
            <StatusRow row={rowData} status={status} price={price} total={total} onBtnClick={this._alertIndex}/>
        );
    }

    displayRow(bids_data) {
        return bids_data.size !== 0 ?
            <CustomTable rowHeaders={this.state.rowHeaders}
                         rowData={bids_data} rowColumns={this.state.rowColumns}
                         buttonText="View Details" onPress={this._alertIndex}
                         colButtonComponent={this.showComponentButton}
                         customRowComponent={this.showCustomRow}/>
            : <EmptyTable message={this.state.emptyMessage}/>;
    }

    render() {
        let app = this.props.app;
        let accepted_bids = this.props.bid.get("accepted_bids");

        return (
            <AppBackground loading={app.get("loading")}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="accepted-order" title="Accepted Bids"/>
                    <Content>
                        <View style={[appStyles.bgWhite]}>
                            {this.displayRow(accepted_bids.get("data"))}
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AcceptedBidList));
