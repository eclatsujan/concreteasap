import * as React from 'react';

import config from '../config';
//App Component
// import AppBackground from '../components/AppBackground';
// import AppLoading from '../components/AppLoading';

import { Toast, Button, Text,View } from 'native-base';


// export function checkAppLoading(app_loading){
//   if(app_loading){
//     return (
//         <AppBackground>
//           <AppLoading/>
//         </AppBackground>
//     );
//   }
// }

export function toastMessage(error_type,error,check_context=""){
  if(error.error_context===check_context){
    Toast.show({
      text: error.error_msg,
      buttonText: 'Okay',
      duration:5000
    });
  }
}

export function showErrorMessage(errorMessage){
  if(typeof errorMessage==undefined||!errorMessage){
    return ;
  }
  return (<View style={{background:"red"}}>
    {errorMessage.map((error,index)=>{
      return <Text key={index}>{error}</Text>
    })}
  </View>);
}
