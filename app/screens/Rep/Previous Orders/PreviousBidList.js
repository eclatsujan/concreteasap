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
            rowHeaders: ['Order No', 'Suburb', 'Cubic m'],
            rowColumns: ["order.id", "order.order_concrete.suburb", "order.order_concrete.quantity"],
            emptyMessage: "No previous bids found.",
            reRender:false
        };

        this.showCustomRow = this.showCustomRow.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }

    componentDidMount() {
        this.props.getRepPreviousBids();
        this.setState({reRender:true});
    }

    showComponentButton() {

    }

    showDetails(rowData) {
        this.props.navigation.navigate("Previous Bid Detail", {
            bid: rowData
        });
    }

    showCustomRow(rowData) {
        return (
            <StatusRow status={getNested(rowData, "order.status")} onBtnClick={this.showDetails} row={rowData}/>

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
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="search" title="Previous Bids"/>
                    <Content style={[appStyles.bgWhite, appStyles.bottomMarginDefault]}>
                        {this.props.app.get("loading") ? <SkeletonLoading/>
                            : this.showContent(bidding_orders.get("data"))}
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