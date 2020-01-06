import * as React from 'react';
import {View, Button, Text, Content, Form, Item, Input} from 'native-base';

import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import CalculatorTab from '../../../components/CalculatorTab'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";
import SubHeader from "../../../components/Headers/SubHeader";
import HomeButton from "../../../components/Button/HomeButton";

export default class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            second: '',
            third: '',
            quantity: "",
            total: '',
        };
        this.clear = this.clear.bind(this);
        this.onPressButton = this.onPressButton.bind(this);
    }

    clear() {
        this.setState({first: ''});
        this.setState({second: ''});
        this.setState({third: ''});
        this.setState({total: ''});
    }

    onPressButton() {
        let backAction = this.props.navigation.getParam("backAction");
        // console.log(this.props.navigation.get);
        let total = 0;
        let l = parseFloat(this.state.first);
        let w = parseFloat(this.state.second);
        let h = parseFloat(this.state.third) / 1000;

        if (!isNaN(l) && !isNaN(w) && !isNaN(h) && !isNaN(this.state.quantity)) {
            let v = l * w * h;
            total = v.toFixed(1);
            total = total * this.state.quantity;
            total = total.toString();
        }

        this.setState({total: total});
    }

    render() {
        let backAction = this.props.navigation.getParam("backAction");
        let backRoute = this.props.navigation.getParam("backRoute");
        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <Content>
                    <SubHeader iconType="ConcreteASAP" iconName="calculators" title="Calculator"/>
                    <CalculatorTab firstButton backAction={backAction} backRoute={backRoute}/>
                    <Form>
                        <View>
                            <View>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.ft_15, appStyles.my_5]}>
                                    L(m)
                                </Text>
                            </View>
                            <Item style={[appStyles.bgWhite, appStyles.marginXDefault, appStyles.my_5]} regular>
                                <Input placeholder="L(m)" value={this.state.first} style={appStyles.baseFont}
                                       onChangeText={(first) => this.setState({first})} keyboardType='numeric'/>
                            </Item>
                        </View>
                        <View>
                            <View>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.ft_15, appStyles.my_5]}>
                                    W(m)
                                </Text>
                            </View>
                            <Item style={[appStyles.bgWhite, appStyles.marginXDefault, appStyles.my_5]} regular>
                                <Input placeholder="W(m)" value={this.state.second} style={appStyles.baseFont}
                                       onChangeText={(second) => this.setState({second})} keyboardType='numeric'/>
                            </Item>
                        </View>
                        <View>
                            <View>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.ft_15, appStyles.my_5]}>
                                    D(m)
                                </Text>
                            </View>
                            <Item style={[appStyles.bgWhite, appStyles.marginXDefault, appStyles.my_5]} regular>
                                <Input placeholder="D(m)" value={this.state.third} style={appStyles.baseFont}
                                       onChangeText={(third) => this.setState({third})} keyboardType='numeric'/>
                            </Item>
                        </View>
                        <View>
                            <View>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.ft_15, appStyles.my_5]}>
                                    Quantity
                                </Text>
                            </View>
                            <Item style={[appStyles.bgWhite, appStyles.marginXDefault, appStyles.my_5]} regular>
                                <Input placeholder="Quantity" value={this.state.quantity} style={appStyles.baseFont}
                                       onChangeText={(quantity) => this.setState({quantity})} keyboardType='numeric'/>
                            </Item>
                        </View>
                        <View>
                            <View>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.ft_15, appStyles.my_5]}>
                                    Total
                                </Text>
                            </View>
                            <View style={[appStyles.bgWhite, appStyles.marginXDefault, appStyles.my_5, appStyles.p_15]}>
                                <Text>{this.state.total}</Text>
                            </View>
                        </View>
                        <View style={appStyles.my_5}>
                            <Button style={[appStyles.button, appStyles.justifyItemsCenter]} primary
                                    onPress={this.onPressButton}>
                                <Text style={appStyles.colorBlack}>{"Calculate"}</Text>
                            </Button>
                        </View>
                        {backAction ? <View style={appStyles.my_5}>
                            <Button style={[appStyles.button, appStyles.justifyItemsCenter]}
                                    onPress={() => {
                                        this.props.navigation.navigate(backRoute, {
                                            total_quantity: this.state.total
                                        });
                                    }}>
                                <Text style={appStyles.colorBlack}>{"Place Order with Total"}</Text>
                            </Button>
                        </View> : null}
                        <View style={appStyles.my_5}>
                            <Button style={[appStyles.button, appStyles.justifyItemsCenter]} danger
                                    onPress={this.clear}>
                                <Text style={appStyles.colorBlack}>Clear</Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </AppBackground>
        );
    }
}
