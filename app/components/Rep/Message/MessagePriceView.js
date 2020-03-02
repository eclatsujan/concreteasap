import * as React from 'react';
import {Col, Item, Row, Text, View, Button} from 'native-base';
import {appStyles} from "../../../../assets/styles/app_styles";
import {TextInput} from "react-native";
import CustomButton from "../../Basic/Button/CustomButton";

export default class MessagePriceView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pricePer: 0,
            show: false,
            loading:false
        };
        this.setMessagePrice = this.setMessagePrice.bind(this);
        this.showInput = this.showInput.bind(this);
        this.setPrice=this.setPrice.bind(this);
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
        this.setState({loading:true});
        price = price === "" ? 0 : parseFloat(price);
        this.setState({pricePer: price});
    }

    setPrice(){
        this.props?.setPrice(this.props?.message_id,this.state.pricePer);
        this.setState({show:false});
    }

    showInput() {
        let price = this.state.pricePer === 0 ? "" : this.state.pricePer.toString();
        return (
            <View>
                <Row style={appStyles.justifyItemsCenter}>
                    <Col><Text style={appStyles.boldFont}>Total Amount</Text></Col>
                    <Col>
                        <View>
                            <Item style={[appStyles.loginInput,appStyles.border2]} regular>
                                <TextInput keyboardType={'numeric'} placeholder="Enter Message Amount"
                                           style={[appStyles.baseFont,appStyles.p_10,appStyles.w_100]}
                                           value={price} onChangeText={this.setMessagePrice}/>
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
        return this.props.price<=0 ? !this.state.show?<Row>
            <CustomButton onPress={() => {
                this.setState({show: true})
            }} btnText={"Enter Price"}/></Row>:null :this.showPriceColumn();
    }

    showPriceColumn(){
        return (
            <View>
                <Row>
                    <Col><Text style={appStyles.boldFont}>Price:</Text></Col>
                    <Col><Text>{this.props.price}</Text></Col>
                </Row>
                <Row>
                    <Col><Text style={appStyles.boldFont}>Status:</Text></Col>
                    <Col><Text>{this.props.status}</Text></Col>
                </Row>
            </View>
        )
    }

    render() {

        return (
            <View style={[appStyles.borderBottom2, appStyles.bgWhite, appStyles.p_10]}>
                <View>
                    <Row style={[appStyles.py_5]}>
                        <Col><Text style={appStyles.boldFont}>Quantity (m3):</Text></Col>
                        <Col><Text>{this.props.quantity}</Text></Col>
                    </Row>
                    {this.state.show ? this.showInput() : null}
                    {this.showPriceButton()}
                </View>
            </View>
        );
    }
}