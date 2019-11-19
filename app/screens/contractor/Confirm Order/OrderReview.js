//Core
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Content,View, Row, Col, Text, Button} from 'native-base';
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

class OrderReview extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            rating:""
        };
        this.ratingCompleted = this.ratingCompleted.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    ratingCompleted(rating) {
        this.setState({rating});
    }

    handleSubmit(values){
        let order_review=values.toJS();
        order_review["rating"]=this.state.rating;
        order_review["order_id"]=this.props.navigation.getParam("order_id");
        this.props.completeOrder(order_review);
    }

    render() {
        let app=this.props.app.toJS();
        const {handleSubmit} = this.props;
        return (
            <AppBackground loading={app.loading} alignTop>
                <ScrollView style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <SubHeader title="Job Complete" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={[appStyles.bgWhite, appStyles.p_10]}>
                        <View>
                            <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                                <Col>
                                    <Field name="quantity" keyboardType="numeric" placeholder="Final Quantity"
                                           component={csTextBox}
                                           type="text" validate={[formValidation.required]}/>
                                </Col>
                                <Col style={appStyles.p_5}>
                                    <Text>Enter Total M3 Poured</Text>
                                </Col>
                            </Row>
                            <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                                <Col style={[appStyles.flexAlignLeft,appStyles.horizontalCenter]}>
                                    <AirbnbRating
                                        showRating={false}
                                        type="star"
                                        ratingCount={5}
                                        defaultRating={0}
                                        size={22}
                                        onFinishRating={this.ratingCompleted}
                                    />
                                </Col>
                                <Col style={appStyles.py_5}>
                                    <Text>Rate Concrete Company</Text>
                                </Col>
                            </Row>
                            <Row style={[appStyles.borderBottom, appStyles.p_5]}>
                                <Col>
                                    <Text>COMMENTS</Text>
                                </Col>
                            </Row>
                            <Row style={[appStyles.py_5]}>
                                <Col>
                                    <Field name="comment" placeholder="" component={csTextArea}
                                           type="text" validate={[formValidation.required]}/>
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
        app:state.get("app"),
        initialValues: {}
    }
};

let reviewFormRedux = reduxForm({form: "orderReview"})(OrderReview);


export default connect(mapStateToProps,mapDispatchToProps)(reviewFormRedux);