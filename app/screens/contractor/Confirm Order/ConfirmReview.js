//Core
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Content, View, Row, Col, Text, Button} from 'native-base';
//Custom Packages
import {Field, reduxForm} from "redux-form/lib/immutable";
import {connect} from "react-redux";


import {appStyles} from "../../../../assets/styles/app_styles";

//App Component
import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'

import SubHeader from "../../../components/Headers/SubHeader";

import csTextBox from "../../../components/Forms/csTextBox";
import {formValidation} from "../../../helpers/validation";
import csTextArea from "../../../components/Forms/csTextArea";
// import StarReview from "react-native-star-review";

import {AirbnbRating} from 'react-native-ratings';
import {order} from "../../../store/modules/order";
import {actions} from "../../../store/modules";
import ConfirmReviewForm from "../../../components/contractor/Confirm/ConfirmReviewForm";

class ConfirmReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: "",
            initialValues:{
                total:"0",
                quantity:"0",
                total_m3:"0",
                total_amount:"0"
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onQuantityChange=this.onQuantityChange.bind(this);
    }

    componentDidMount() {
        let total=this.props.navigation.getParam("total");
        let quantity=this.props.navigation.getParam("quantity");
        let initialValues={...this.state.initialValues};
        initialValues.total=total?.toString();
        initialValues.quantity=quantity?.toString();
        initialValues.total_m3=quantity?.toString();
        initialValues.total_amount=total?.toString();
        this.setState({initialValues});
    }

    ratingCompleted(rating) {
        this.setState({rating});
    }

    handleSubmit(values) {

        this.props.navigation.navigate("Confirm Comment",{
            review:values,
            order_id:this.props.navigation.getParam("order_id")
        });
    }

    onQuantityChange(message_m3){
        let price=this.props.navigation.getParam("price");
        let m3=parseFloat(message_m3);
        m3=isNaN(m3)?0:m3;
        let initialValues={...this.state.initialValues};
        let total=!isNaN(m3)?price*m3:0;
        initialValues.message_total=total.toString();
        initialValues.total_m3=(parseFloat(this.state.initialValues.quantity)+m3).toString();
        initialValues.total_amount=(parseFloat(this.state.initialValues.total)+total).toString();
        this.setState({initialValues});
    }

    render() {
        // const {handleSubmit} = this.props;
        return (
            <AppBackground loading={this.props.app.get("loading")} alignTop>
                <ScrollView style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <SubHeader title="Job Complete" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={[appStyles.bgWhite, appStyles.p_10]}>
                        <ConfirmReviewForm onSubmit={this.handleSubmit} onQuantityChange={this.onQuantityChange}
                                           initialValues={this.state.initialValues} />
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        completeOrder: (order_review) => {
            return dispatch(actions.order.contractorCompleteOrder(order_review))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        initialValues: {}
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmReview);