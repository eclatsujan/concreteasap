import * as React from "react";
import {Button, Col, Row, Text, View} from "native-base";
import {appStyles} from "../../../../../assets/styles/app_styles";
import ButtonIcon from "../../../Basic/Button/ButtonIcon";

export class OrderMessageView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={[appStyles.bgWhite, appStyles.p_10, appStyles.mb_5]}>
                    <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                        <Col>
                            <Text style={appStyles.boldFont}>Quantity (m3)</Text>
                        </Col>
                        <Col>
                            <Text>{this.props.quantity}</Text>
                        </Col>
                    </Row>
                    <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                        <Col>
                            <Text style={appStyles.boldFont}>Total</Text>
                        </Col>
                        <Col>
                            <Text>{this.props.price}</Text>
                        </Col>
                    </Row>

                    {this.props.status === "Awaiting"&&parseFloat(this.props.price)!==0 ? (
                        <View>
                            <Row>
                                <Col>
                                    <ButtonIcon btnBgColor="#fff" iconColor={{color:"#14E22A"}}
                                                onPress={() => this.props.acceptMessage()}
                                                iconName={"check-circle"}/>
                                </Col>
                                <Col>
                                    <ButtonIcon btnBgColor="#fff" iconColor={{color:"#DB0000"}}
                                                onPress={() => this.props.rejectMessage()}
                                                iconName={"times-circle"}/>
                                </Col>
                            </Row>
                        </View>
                    ) :  <View style={[appStyles.pt_5]}>
                        <Row>
                            <Col>
                                <Text style={appStyles.boldFont}>Status:</Text>
                            </Col>
                            <Col>
                                <Text>{this.props.status}</Text>
                            </Col>
                        </Row>
                    </View>}
                </View>
            </View>
        )
    }
}