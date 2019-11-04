import * as React from 'react';
import {Picker} from "native-base";
import {appStyles} from "../screens/assets/app_styles";

export function renderList(data) {
  let view = [];
  if (Array.isArray(data)) {
    data.forEach(function (element) {
      view.push(
          <Picker.Item style={[appStyles.baseFont]} label={element.label} value={element.key} key={element.key}/>
      );
    });
  }
  return view;
}

// export function showErrorMessage(errorMessage){
//   if(typeof errorMessage==undefined||!errorMessage){
//     return ;
//   }
//   return (<View style={{background:"red"}}>
//     {errorMessage.map((error,index)=>{
//       return <Text key={index}>{error}</Text>
//     })}
//   </View>);
// }
