//Core
import * as React from 'react';
import {ScrollView,View} from "react-native";
import {appStyles} from "../../../../assets/styles/app_styles";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import {Col, Content, Row, Text} from "native-base";
import AppBackground from "../../../components/AppBackground";
import {actions} from "../../../store/modules";
import {Field, reduxForm} from "redux-form/lib/immutable";
import {connect} from "react-redux";
import {AirbnbRating} from "react-native-ratings";
import csTextArea from "../../../components/Forms/csTextArea";
import {formValidation} from "../../../helpers/validation";

class ConfirmComment extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <AppBackground loading={this.props.app.get("loading")} alignTop>
                <ScrollView style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <SubHeader title="Job Complete" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={[appStyles.bgWhite, appStyles.p_10]}>
                        <View>
                            <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                                <Col style={[appStyles.flexAlignLeft, appStyles.horizontalCenter]}>
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
                                    <Text style={[appStyles.baseFont]}>COMMENTS</Text>
                                </Col>
                            </Row>
                            <Row style={[appStyles.py_5]}>
                                <Col>
                                    <Field name="comment" placeholder="" component={csTextArea}
                                           type="text" validate={[formValidation.required]}/>
                                </Col>
                            </Row>
                        </View>
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

let reviewFormRedux = reduxForm({form: "orderReview"})(ConfirmComment);


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmComment);