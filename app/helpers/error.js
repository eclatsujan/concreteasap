import * as React from 'react';
import { Toast, Text,Icon,View } from 'native-base';

export function showErrorMessage(errorMessage){
  if(typeof errorMessage==undefined||!errorMessage){
    return ;
  }
  return (
    <View style={{backgroundColor:"red",padding:2}}>
    {errorMessage.map((error,index)=>{
      return <Text style={{color:"#fff"}} key={index}>{error}</Text>
    })}
    </View>
  );
}

export function showToastMessage(error_msg){
  if(error_msg!==""){
    Toast.show({
      text: error.error_msg,
      buttonText: 'Okay',
      duration:3500
    });
  }
}

export function getErrorStyle(condition){
  return condition?{borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderBottomWidth:2}:{};
}

export function showErrorIcon(condition){
  return condition?<Icon name='close-circle' />:<Text></Text>;
}
