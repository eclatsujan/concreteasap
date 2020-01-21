import * as React from "react";
import {Button, Col, Row, Text, View} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";

export class OrderMessageView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={[appStyles.bgWhite, appStyles.p_10]}>
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
                    {this.props.status === "Awaiting" ? (
                        <View>
                            <View>
                                <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                        onPress={() =>this.props.acceptMessage()}>
                                    <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                                        Accept Message
                                    </Text>
                                </Button>
                            </View>
                            <View>
                                <Button danger style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                        onPress={() =>this.props.rejectMessage()}>
                                    <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                                        Cancel Message
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>
        )
    }
}