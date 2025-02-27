//Core
import * as React from 'react';
import {ScrollView,View} from "react-native";
import {appStyles} from "../../../../../../assets/styles/app_styles";
import AppHeader from "../../../../../components/Headers/AppHeader";
import SubHeader from "../../../../../components/Headers/SubHeader";
import {Col, Content, Row, Text} from "native-base";
import AppBackground from "../../../../../components/App/AppBackground";
import {actions} from "../../../../../store/modules";
import {Field, reduxForm} from "redux-form/lib/immutable";
import {connect} from "react-redux";
import {AirbnbRating} from "react-native-ratings";
import csTextArea from "../../../../../components/Basic/Forms/csTextArea";
import {formValidation} from "../../../../../helpers/validation";
import ConfirmCommentForm from "../../../../../components/contractor/Concrete/Confirm/ConfirmCommentForm";
import AppFooter from "../../../../../components/App/Footer/AppFooter";

class ConfirmComment extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        let order_type = this.props.navigation.getParam("order_type") ? this.props.navigation.getParam("order_type") : "accepted_orders";
        let order_review={};
        order_review["order_id"]=this.props.navigation.getParam("order_id");
        order_review["message_quantity"]=parseFloat(values.get("total"));
        order_review["message_total"]=parseFloat(values.get("message_total"));
        order_review["quantity"]=parseFloat(values.get("quantity"));
        order_review["total"]=parseFloat(values.get("total"));
        order_review["rating"]=values.get("rating");
        order_review["comment"]=values.get("comment");
        // console.log(order_id);
        console.log(order_review);
        this.props.completeOrder(order_review,order_type);
    }

    render(){
        return (
            <AppBackground loading={this.props.app.get("loading")} enableKeyboard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Job Complete" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <View style={[appStyles.bgWhite, appStyles.p_10]}>
                        <ConfirmCommentForm onSubmit={this.handleSubmit} />
                    </View>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        completeOrder: (order_review,order_type) => {
            return dispatch(actions.order.contractorCompleteOrder(order_review,order_type))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        initialValues: {}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmComment);