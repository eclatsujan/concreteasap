import React from "react";
import {Row, Col, View, Text, Icon, Button} from "native-base";
import {appStyles} from "../../../../assets/styles/app_styles";
import ButtonIcon from "../Button/ButtonIcon";

export default class StatusRow extends React.Component {

    displayFieldProps(field_props,field_label,custom_sign){
        // console.log(this.props[field_props]===undefined);
        return this.props[field_props]!==undefined?(
            <View style={[appStyles.verticalCenter,appStyles.flexRow,appStyles.mb_5]}>
                <Text style={[appStyles.baseSmallFontSize,appStyles.boldFont]}>{field_label}</Text>
                <Text style={[appStyles.ft_small,appStyles.pl_5]}>
                    {custom_sign} {this.props[field_props]}
                </Text>
            </View>
        ):null;
    }

    render(){
         return (
             <View style={appStyles.my_5}>
                 <Row style={[appStyles.flexWrap,appStyles.flexRow,appStyles.justifySpace]}>
                     <View>
                         {this.displayFieldProps("status","Status:")}
                         {this.displayFieldProps("price","Price Per (M3):","$")}
                         {this.displayFieldProps("total","Total Price (M3):","$")}
                     </View>
                 </Row>
                 <Row>
                     <View style={[appStyles.horizontalCenter]}>
                         <ButtonIcon small btnText={"View"} btnSize={12} btnIconSize={12} onPress={()=>{
                             this.props["onBtnClick"](this.props.row)
                         }}/>
                     </View>
                 </Row>
             </View>
        );
    }
}