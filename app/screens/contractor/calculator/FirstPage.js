import * as React from 'react';
import {View, Button, Text, Content, Form, Item, Input} from 'native-base';

import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/AppHeader'
import CalculatorTab from '../../../components/CalculatorTab'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../assets/app_styles";

export default class FirstPage extends React.Component {
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
        let w = parseFloat(this.state.second);
        let h = parseFloat(this.state.third) / 1000;
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
                    <CalculatorTab firstButton/>
                    <Form>
                        <Item style={[appStyles.bgWhite, appStyles.marginXDefault]} regular>
                            <Input placeholder="L(m)" value={this.state.first} style={appStyles.baseFont}
                                   onChangeText={(first) => this.setState({first})} keyboardType='numeric'/>
                        </Item>
                        <Item style={[appStyles.bgWhite, appStyles.marginXDefault]} regular>
                            <Input placeholder="W(m)" value={this.state.second} style={appStyles.baseFont}
                                   onChangeText={(second) => this.setState({second})} keyboardType='numeric'/>
                        </Item>
                        <Item style={[appStyles.bgWhite, appStyles.marginXDefault]} regular>
                            <Input placeholder="D(m)" value={this.state.third} style={appStyles.baseFont}
                                   onChangeText={(third) => this.setState({third})} keyboardType='numeric'/>
                        </Item>
                        <View style={[appStyles.bgWhite, appStyles.marginXDefault, appStyles.p_5]}>
                            <Text>Total:</Text>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.total}</Text>
                        </View>
                        <View style={styles.container}>
                            <Button style={[appStyles.button]} primary
                                    onPress={this.onPressButton}><Text> Calculate </Text></Button>
                        </View>
                        <View style={styles.container}>
                            <Button danger onPress={this.clear}><Text> Clear </Text></Button>
                        </View>
                    </Form>
                </Content>
            </AppBackground>
        );
    }
}
