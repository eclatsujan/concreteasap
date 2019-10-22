import React from "react";

import {Form,Item as FormItem,Input} from "native-base";

export default class CustomFormItem extends React.Component {

    constructor(props){
      this.props=props;
    }

    renderInput({ input, label, type, meta: { touched, error, warning } }){
      var hasError= false;
      if(error !== undefined){
        hasError= true;
      }
      return(
          <Item error= {hasError}>
            <Input {...input}/>
            {hasError ? <Text>{error}</Text> : <Text />}
          </Item>
        )
      }

    render(){
      return (

      );
    }
}
