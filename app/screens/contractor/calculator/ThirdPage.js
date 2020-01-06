import * as React from 'react';
import {View, Button, Text, Content, Form, Item, Input} from 'native-base';

import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import CalculatorTab from '../../../components/CalculatorTab'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";
import SubHeader from "../../../components/Headers/SubHeader";


export default class ThirdPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            second: '',
            third: '',
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
        let total;

        let height = parseFloat(this.state.first);
        let diameter = parseFloat(this.state.second)/1000;
        let quantity = parseFloat(this.state.third);

        let area=Math.pow((diameter / 2),2) * Math.PI;

        total =  ((height * area))*quantity;

        total=total.toFixed(2).toString();
        this.setState({total: total});
    }

    render() {
        let backAction=this.props.navigation.getParam("backAction");
        let backRoute="PlaceOrderRequest";
        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <Content>
                    <SubHeader iconType="ConcreteASAP" iconName="calculators" title="Calculator"/>
                    <CalculatorTab thirdButton backAction={backAction} backRoute={backRoute}/>
                    <Form>
                        <View>
                            <View>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.ft_15, appStyles.my_5]}>
                                    Height(m)
                                </Text>
                            </View>
                            <Item style={[appStyles.bgWhite, appStyles.marginXDefault,appStyles.my_5]} regular>
                                <Input placeholder="Height(m)" value={this.state.first} style={appStyles.baseFont}
                                       onChangeText={(first) => this.setState({first})}
                                       keyboardType='numeric'/>
                            </Item>
                        </View>
                        <View>
                            <View>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.ft_15, appStyles.my_5]}>
                                    Diameter(mm)
                                </Text>
                            </View>
                            <Item style={[appStyles.bgWhite, appStyles.marginXDefault,appStyles.my_5]} regular>
                                <Input placeholder="Diameter(m)" value={this.state.second} style={appStyles.baseFont}
                                       onChangeText={(second) => this.setState({second})} keyboardType='numeric'/>
                            </Item>
                        </View>
                        <View>
                            <View>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.ft_15, appStyles.my_5]}>
                                    Qty
                                </Text>
                            </View>
                            <Item style={[appStyles.bgWhite, appStyles.marginXDefault,appStyles.my_5]} regular>
                                <Input placeholder="Qty" style={appStyles.baseFont} value={this.state.third}
                                       style={appStyles.baseFont}
                                       onChangeText={(third) => this.setState({third})} keyboardType='numeric'/>
                            </Item>
                        </View>
                        <View>
                            <View>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.ft_15, appStyles.my_5]}>
                                    Total
                                </Text>
                            </View>
                            <View style={[appStyles.bgWhite, appStyles.marginXDefault, appStyles.p_15,appStyles.my_5]}>
                                <Text>{this.state.total}</Text>
                            </View>
                        </View>
                        <View style={appStyles.my_5}>
                            <Button style={[appStyles.button, appStyles.justifyItemsCenter]} primary
                                    onPress={this.onPressButton}>
                                <Text style={appStyles.colorBlack}>Calculate</Text>
                            </Button>
                        </View>
                        {backAction?<View style={appStyles.my_5}>
                            <Button style={[appStyles.button, appStyles.justifyItemsCenter]}
                                    onPress={()=>{
                                        this.props.navigation.navigate(backRoute,{
                                            total_quantity:this.state.total
                                        });
                                    }}>
                                <Text style={appStyles.colorBlack}>{"Place Order with Total"}</Text>
                            </Button>
                        </View>:null}
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
