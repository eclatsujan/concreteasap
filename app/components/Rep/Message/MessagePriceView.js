import * as React from 'react';
import {Col, Item, Row, Text, View, Button, Icon} from 'native-base';
import {appStyles} from "../../../../assets/styles/app_styles";
import {TextInput} from "react-native";
import CustomButton from "../../Basic/Button/CustomButton";
import {normalize} from "../../../helpers/app";

export default class MessagePriceView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pricePer: 0,
            show: false,
            loading: false
        };
        this.setMessagePrice = this.setMessagePrice.bind(this);
        this.showInput = this.showInput.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.showPriceButton = this.showPriceButton.bind(this);
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.loading !== props.loading) {
            return {
                loading: props.loading,
            }
        }
        return current_state;
    }

    setMessagePrice(price) {
        this.setState({loading: true});
        price = price === "" ? 0 : parseFloat(price);
        this.setState({pricePer: price});
    }

    setPrice() {
        if (this.state.pricePer !== 0) {
            this.props?.setPrice(this.props?.message_id, this.state.pricePer);
        }
        this.setState({show: false});
    }

    showInput() {
        let price = this.state.pricePer === 0 ? "" : this.state.pricePer.toString();
        return (
            <View>
                <Row style={appStyles.justifyItemsCenter}>
                    <Col style={appStyles.w_35}><Text style={appStyles.boldFont}>Total Amount</Text></Col>
                    <Col style={appStyles.w_65}>
                        <View>
                            <Item style={[appStyles.loginInput, appStyles.border2]} regular>
                                <View
                                    style={[appStyles.bgBlack, appStyles.px_5, appStyles.h_100, appStyles.horizontalCenter]}>
                                    <Icon active name='dollar' type={"FontAwesome"}
                                          style={[appStyles.colorWhite,{fontSize:normalize(10)}]}/>
                                </View>
                                <View style={appStyles.flex1}>
                                    <TextInput keyboardType={'numeric'} placeholder="Enter Message Amount"
                                               style={[appStyles.baseFont, appStyles.py_10,appStyles.px_10,appStyles.w_100, appStyles.h_100]}
                                               value={price} onChangeText={this.setMessagePrice}/>
                                </View>
                            </Item>
                        </View>
                    </Col>
                </Row>
                <Row>
                    <CustomButton onPress={this.setPrice} btnText={"Set Price"}/>
                </Row>
            </View>
        );
    }

    showPriceButton() {
        return this.props.price <= 0 ? !this.state.show ? <Row>
            <CustomButton onPress={() => {
                this.setState({show: true})
            }} btnText={"Enter Price"}/></Row> : null : this.showPriceColumn();
    }

    showPriceColumn() {
        return (
            <View>
                <Row>
                    <Col style={appStyles.w_35}><Text style={appStyles.boldFont}>Price:</Text></Col>
                    <Col style={appStyles.w_65}><Text>{this.props.price}</Text></Col>
                </Row>
                <Row>
                    <Col style={appStyles.w_35}><Text style={appStyles.boldFont}>Status:</Text></Col>
                    <Col style={appStyles.w_65}><Text>{this.props.status}</Text></Col>
                </Row>
            </View>
        )
    }

    render() {

        return (
            <View style={[appStyles.borderBottom2, appStyles.bgWhite, appStyles.p_10]}>
                <View>
                    <Row style={[appStyles.py_5]}>
                        <Col style={appStyles.w_35}><Text style={appStyles.boldFont}>Quantity (m3):</Text></Col>
                        <Col style={appStyles.w_6xx5}><Text>{this.props.quantity}</Text></Col>
                    </Row>
                    {this.state.show ? this.showInput() : null}
                    {this.showPriceButton()}
                </View>
            </View>
        );
    }
}