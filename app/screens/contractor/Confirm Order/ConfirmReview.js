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

class ConfirmReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: ""
        };
        this.ratingCompleted = this.ratingCompleted.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    ratingCompleted(rating) {
        this.setState({rating});
    }

    handleSubmit(values) {
        let order_review = values;
        order_review=order_review.set("rating",this.state.rating);
        order_review=order_review.set("order_id",this.props.navigation.getParam("order_id"));
        order_review.toJS();
        this.props.completeOrder(order_review);
    }

    render() {
        const {handleSubmit} = this.props;
        let total=this.props.navigation.getParam("total");
        let quantity=this.props.navigation.getParam("quantity");
        return (
            <AppBackground loading={this.props.app.get("loading")} alignTop>
                <ScrollView style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <SubHeader title="Job Complete" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={[appStyles.bgWhite, appStyles.p_10]}>
                        <View>
                            <View>
                                <Text style={[appStyles.customFont,appStyles.boldFont,appStyles.upperCase]}>
                                    Initial Order
                                </Text>
                            </View>
                            <Row style={[appStyles.py_5]}>
                                <Col>
                                    <Field name="quantity" initialValue={quantity} keyboardType="numeric"
                                           placeholder="Final Quantity" component={csTextBox}
                                           type="text" validate={[formValidation.required]}/>
                                </Col>
                                <Col style={appStyles.p_5}>
                                    <Text style={appStyles.boldFont}>M3 Ordered</Text>
                                </Col>
                            </Row>
                            <Row style={[appStyles.py_5]}>
                                <Col>
                                    <Field name="quantity" keyboardType="numeric" placeholder="Final Quantity"
                                           component={csTextBox}
                                           type="text" validate={[formValidation.required]}/>
                                </Col>
                                <Col style={appStyles.p_5}>
                                    <Text style={appStyles.boldFont}>Amount</Text>
                                </Col>
                            </Row>
                        </View>
                        <View>
                            <View>
                                <Text style={[appStyles.customFont,appStyles.boldFont,appStyles.upperCase]}>
                                    Message (Please enter Amount Ordered)
                                </Text>
                            </View>
                            <Row style={[appStyles.py_5]}>
                                <Col>
                                    <Field name="m3_message" keyboardType="numeric" placeholder="M3 Message"
                                           component={csTextBox}
                                           type="text" validate={[formValidation.required]}/>
                                </Col>
                                <Col style={appStyles.p_5}>
                                    <Text>M3 Message</Text>
                                </Col>
                            </Row>
                            <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                                <Col>
                                    <Field name="message_amount" keyboardType="numeric" placeholder="Amount"
                                           component={csTextBox}
                                           type="text" validate={[formValidation.required]}/>
                                </Col>
                                <Col style={appStyles.p_5}>
                                    <Text>Amount</Text>
                                </Col>
                            </Row>
                        </View>
                        <View>
                            <View>
                                <Text style={[appStyles.customFont,appStyles.boldFont,appStyles.upperCase]}>
                                    Total Amount
                                </Text>
                            </View>
                            <Row style={[ appStyles.py_5]}>
                                <Col>
                                    <Field name="total_m3" keyboardType="numeric" placeholder="Total M3 Poured"
                                           component={csTextBox}
                                           type="text" validate={[formValidation.required]}/>
                                </Col>
                                <Col style={appStyles.p_5}>
                                    <Text>Total M3 Poured</Text>
                                </Col>
                            </Row>
                            <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                                <Col>
                                    <Field name="total_amount" keyboardType="numeric" placeholder="Total Amount"
                                           component={csTextBox}
                                           type="text" validate={[formValidation.required]}/>
                                </Col>
                                <Col style={appStyles.p_5}>
                                    <Text>Total Amount</Text>
                                </Col>
                            </Row>
                        </View>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={handleSubmit(this.handleSubmit)}>
                            <Text style={appStyles.colorBlack}>Confirm Job Completion</Text>
                        </Button>
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

let reviewFormRedux = reduxForm({form: "orderReview"})(ConfirmReview);


export default connect(mapStateToProps, mapDispatchToProps)(reviewFormRedux);