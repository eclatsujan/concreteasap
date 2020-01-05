//Core
import * as React from 'react';
import {Button, Col, Content, Row, Text, View} from "native-base";
import {appStyles} from "../../../../assets/styles/app_styles";
import {Field, reduxForm} from "redux-form/lib/immutable";
import csTextBox from "../../Forms/csTextBox";
import {formValidation} from "../../../helpers/validation";

class ConfirmReviewDetail extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        const {handleSubmit,onSubmit} = this.props;
        return (
            <View>
                <View>
                    <View>
                        <Text style={[appStyles.customFont, appStyles.boldFont, appStyles.upperCase]}>
                            Initial Order
                        </Text>
                    </View>
                    <Row style={[appStyles.py_5, appStyles.verticalCenter]}>
                        <Col>
                            <Field name="quantity" keyboardType="numeric" editable={false}
                                   placeholder="Final Quantity" component={csTextBox}
                                   type="text" validate={[formValidation.required]}/>
                        </Col>
                        <Col style={appStyles.p_5}>
                            <Text style={appStyles.boldFont}>M3 Ordered</Text>
                        </Col>
                    </Row>
                    <Row style={[appStyles.py_5, appStyles.verticalCenter]}>
                        <Col>
                            <Field name="total" keyboardType="numeric" placeholder="Final Quantity"
                                   component={csTextBox} editable={false}
                                   type="text" validate={[formValidation.required]}/>
                        </Col>
                        <Col style={appStyles.p_5}>
                            <Text style={appStyles.boldFont}>Amount</Text>
                        </Col>
                    </Row>
                </View>
                <View>
                    <View>
                        <Text style={[appStyles.customFont, appStyles.boldFont, appStyles.upperCase]}>
                            Message
                        </Text>
                    </View>
                    <Row style={[appStyles.py_5, appStyles.verticalCenter]}>
                        <Col>
                            <Field name="message_m3" keyboardType="numeric" placeholder="M3 Message"
                                   component={csTextBox} onChange={(text) => {
                                this.props?.onQuantityChange(text);
                            }}
                                   type="text" validate={[formValidation.required]}/>
                        </Col>
                        <Col style={appStyles.p_5}>
                            <Text>M3 Message</Text>
                        </Col>
                    </Row>
                    <Row style={[appStyles.borderBottom, appStyles.py_5, appStyles.verticalCenter]}>
                        <Col>
                            <Field name="message_total" keyboardType="numeric" placeholder="Amount"
                                   component={csTextBox} editable={false} type="text"
                                   validate={[formValidation.required]}/>
                        </Col>
                        <Col style={appStyles.p_5}>
                            <Text>Amount</Text>
                        </Col>
                    </Row>
                </View>
                <View>
                    <View>
                        <Text style={[appStyles.customFont, appStyles.boldFont, appStyles.upperCase]}>
                            Total Amount
                        </Text>
                    </View>
                    <Row style={[appStyles.py_5, appStyles.verticalCenter]}>
                        <Col>
                            <Field name="total_m3" keyboardType="numeric" placeholder="Total M3 Poured"
                                   component={csTextBox} editable={false} type="text"
                                   validate={[formValidation.required]}/>
                        </Col>
                        <Col style={appStyles.p_5}>
                            <Text>Total M3 Poured</Text>
                        </Col>
                    </Row>
                    <Row style={[appStyles.borderBottom, appStyles.py_5, appStyles.verticalCenter]}>
                        <Col>
                            <Field name="total_amount" keyboardType="numeric" placeholder="Total Amount"
                                   component={csTextBox} editable={false} type="text"
                                   validate={[formValidation.required]}/>
                        </Col>
                        <Col style={appStyles.p_5}>
                            <Text>Total Amount</Text>
                        </Col>
                    </Row>
                </View>
                <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                        onPress={handleSubmit(onSubmit)}>
                    <Text style={appStyles.colorBlack}>Confirm Amount Poured</Text>
                </Button>
            </View>
        );
    }

}


let confirmReviewForm = reduxForm({form: "orderReview", "enableReinitialize": true})(ConfirmReviewDetail);

export default confirmReviewForm;
