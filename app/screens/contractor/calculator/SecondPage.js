import * as React from 'react';
import {View, Button, Text, Content, Form, Item, Input} from 'native-base';

import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import CalculatorTab from '../../../components/CalculatorTab'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../assets/app_styles";
import SubHeader from "../../../components/Headers/SubHeader";

export default class SecondPage extends React.Component {
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
        let total = 0;
        let l = parseFloat(this.state.first);
        let w = parseFloat(this.state.second) / 1000.0;
        let h = parseFloat(this.state.third) / 1000.0;

        if (!isNaN(l) && !isNaN(w) && !isNaN(h)) {
            let v = l * w * h;
            total = v.toFixed(1);
        }
        this.setState({total: total});
    }

    render() {

        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <Content>
                    <SubHeader iconType="ConcreteASAP" iconName="calculators" title="Calculator"/>
                    <CalculatorTab secondButton/>
                    <Form>
                        <Item style={[appStyles.bgWhite, appStyles.marginXDefault,appStyles.my_5]} regular>
                            <Input placeholder="L(mm)" value={this.state.first} style={appStyles.baseFont}
                                   onChangeText={(first) => this.setState({first})} keyboardType='numeric'/>
                        </Item>
                        <Item style={[appStyles.bgWhite, appStyles.marginXDefault,appStyles.my_5]} regular>
                            <Input placeholder="W(mm)" value={this.state.second} style={appStyles.baseFont}
                                   onChangeText={(second) => this.setState({second})} keyboardType='numeric'/>
                        </Item>
                        <Item style={[appStyles.bgWhite, appStyles.marginXDefault,appStyles.my_5]} regular>
                            <Input placeholder="D(mm)" value={this.state.third} style={appStyles.baseFont}
                                   onChangeText={(third) => this.setState({third})} keyboardType='numeric'/>
                        </Item>
                        <View style={[appStyles.bgWhite, appStyles.marginXDefault,appStyles.my_5, appStyles.p_5]}>
                            <Text>Total:</Text>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.total}</Text>
                        </View>
                        <View style={appStyles.my_5}>
                            <Button style={[appStyles.button]} primary
                                    onPress={this.onPressButton}><Text> Calculate </Text></Button>
                        </View>
                        <View style={appStyles.my_5}>
                            <Button danger onPress={this.clear}><Text> Clear </Text></Button>
                        </View>
                    </Form>
                </Content>
            </AppBackground>
        );
    }
}
