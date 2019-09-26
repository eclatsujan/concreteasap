import React, {Component} from 'react';
import {WebView,View,Platform} from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import * as FileSystem from "expo-file-system";

import {paymentService} from "../../services/paymentService"

export default class PayPal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sent: false,
            isReady:false
        };
        this.fileContents="";
        this.payment_token="";
        this._loadAssetsAsync=this._loadAssetsAsync.bind(this);
        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;
            var patchedPostMessage = function(message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };
            patchedPostMessage.toString = function() {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
            window.postMessage = patchedPostMessage;
        };
        this.patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
    }
    componentWillMount() {
        this.setState({
            loading: true
        });
    }
    handleNavigation(event) {
        'handleNavigation' in this.props && this.props.handleNavigation(event)
    }

    handleMessage(event) {
        let data = event.nativeEvent.data;
        console.log(data);
        // data = JSON.parse(data);
        // if (data.status == 'success') {
        //     this.props.success(data)
        // } else {
        //     this.setState({
        //         loading: false
        //     });
        //     this.props.failed(data)
        // }
    }
    passValues() {
        let data = {
            amount             : 'amount'             in this.props  ? this.props.amount             : null,
            orderID            : 'orderID'            in this.props  ? this.props.orderID            : null,
            ProductionClientID : 'ProductionClientID' in this.props ? this.props.ProductionClientID : null,
            paymentToken: this.payment_token.payment_token
        };
        if (!this.state.sent) {
            this.refs.webview.postMessage(JSON.stringify(data));
            this.setState({
                loading: false,
                sent: true
            });
        }
    }

    async _loadAssetsAsync(){
        this.payment_token=await paymentService.getPaymentToken();
        await Asset.loadAsync(require('./paypal.html'));
        const {localUri}=Asset.fromModule(require('./paypal.html'));
        this.fileContents=await FileSystem.readAsStringAsync(localUri);
        console.log(this.fileContents);
        return true;
    }


    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return (
            <View style = {{flex: 1}}>
                <WebView style = {{overflow: 'scroll'}}
                         source = {{html:this.fileContents}}
                         originWhitelist = {["*"]}
                         mixedContentMode = {'always'}
                         useWebKit = {Platform.OS == 'ios'}
                         onLoadEnd = {() => this.passValues()}
                         ref = "webview"
                         thirdPartyCookiesEnabled = {true}
                         scrollEnabled = {true}
                         domStorageEnabled = {true}
                         startInLoadingState = {true}
                         injectedJavaScript = {this.patchPostMessageJsCode}
                         allowUniversalAccessFromFileURLs = {true}
                         onMessage = {(event) => this.handleMessage(event)}
                         onNavigationStateChange = {(event) => this.handleNavigation(event)}
                         javaScriptEnabled = {true}/>
            </View>
        );
    }
}