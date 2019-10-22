import React from "react";

import {View,ImageBackground,Dimensions,SafeAreaView,Platform} from "react-native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {Container} from "native-base";

//helpers
import * as appHelper from '../helpers/app';
import * as errorHelper from '../helpers/error';

//Custom Component
import AppLoading from './AppLoading';

export default class AppBackground extends React.Component {

    constructor(props){
      super(props);
    }

    renderIOS(){
      return (<SafeAreaView>
        {this.renderView()}
      </SafeAreaView>);
    }

    renderView(){
      return (
        <KeyboardAwareScrollView enableOnAndroid={true}
            keyboardShouldPersistTaps='handled' style={{marginLeft:20,marginRight:20}}>
          {this.props.children}
      </KeyboardAwareScrollView>);
    }

    checkLoading(){
      if(this.props.loading){
        return (<AppLoading/>);
      }
      else{
        return this.showContent();
      }
    }

    showContent(){
      return Platform.OS==="ios"?this.renderIOS():this.renderView();
    }

    showErrorToast(){
      if(this.props.errorToastMessage){
        errorHelper.showToastMessage(errorMessage);
      }
    }

    render(){
      let { height, width } = Dimensions.get('window');
      this.showErrorToast();
      return (
        <ImageBackground source={require("../../assets/concrete-background.png")} style={{width,height,justifyContent : 'center'}}>
              {this.checkLoading()}
        </ImageBackground>
      );
    }

}
