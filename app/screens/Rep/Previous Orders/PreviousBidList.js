import * as React from 'react';
import {connect} from "react-redux";
import {actions} from "../../../store/modules";
import AppBackground from "../../../components/AppBackground";
import {ScrollView} from "react-native";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import {Content, View, Button, Text} from "native-base";
import {appStyles} from "../../../../assets/styles/app_styles";
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";
import CustomTable from "../../../components/Tables/CustomTable";
import EmptyTable from "../../../components/Tables/EmptyTable";
import {getNested} from "../../../helpers/app";
import StatusRow from "../../../components/Tables/StatusRow";

class PreviousBidList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rowHeaders: ['Job No', 'Suburb', 'Cubic m'],
            rowColumns: ["order.job_id", "order.order_concrete.suburb", "order.order_concrete.quantity"],
            emptyMessage: "No previous bids found.",
            reRender: false
        };

        this.showCustomRow = this.showCustomRow.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getRepPreviousBids();
            this.interval = setInterval(this.props.getRepPreviousBids, 10000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });
    }

    componentDidMount() {
        this.props.getRepPreviousBids();
        this.setState({reRender: true});
    }

    showComponentButton() {

    }

    showDetails(rowData) {
        this.props.navigation.navigate("Previous Bid Detail", {
            bid_id: rowData?.get("id")
        });
    }

    showCustomRow(rowData) {
        // console.log(rowData);
        return (
            <StatusRow status={rowData?.get("order")?.get("status")} onBtnClick={this.showDetails} row={rowData}/>
        );
    }

    showContent(previous_bids) {
        return previous_bids.length < 1 ? <EmptyTable message={this.state.emptyMessage}/>
            : <CustomTable bgStyle={[appStyles.bgWhite]}
                           rowHeaders={this.state.rowHeaders}
                           rowData={previous_bids} rowColumns={this.state.rowColumns}
                           colButtonComponent={this.showComponentButton}
                           customRowComponent={this.showCustomRow}
                           buttonText="View" onPress={this._showDetails}/>;
    }

    render() {
        let bidding_orders = this.props.bid.get("previous_bids");
        return (
            <AppBackground loading={this.props.app.get("loading")}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="search" title="Previous Bids"/>
                    <Content style={[appStyles.bgWhite, appStyles.bottomMarginDefault]}>
                        {this.showContent(bidding_orders.get("data"))}
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }


}


const mapDispatchToProps = (dispatch) => {
    return {
        getRepPreviousBids: () => {
            return dispatch(actions.bid.getRepPreviousBids())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        bid: state.get("bid")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PreviousBidList);