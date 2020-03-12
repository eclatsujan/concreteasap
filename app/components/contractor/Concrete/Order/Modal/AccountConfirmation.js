import * as React from "react";
import {Modal,View,Text} from "react-native";
import {appStyles} from "../../../../../../assets/styles/app_styles";
import {Button} from "native-base";
import {normalize} from "../../../../../helpers/app";
import CustomButton from "../../../../Basic/Button/CustomButton";

export default class AccountConfirmation extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        let btnSuccessText=typeof this.props["btnSuccessText"]==="undefined"?"Proceed":this.props["btnSuccessText"];
        let btnCancelText=typeof this.props["btnCancelText"]==="undefined"?"Cancel":this.props["btnCancelText"];
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props["modalVisibility"]}
            >
                <View
                    style={[appStyles.modalBg, appStyles.verticalCenter, appStyles.horizontalCenter, appStyles.flex1]}>
                    <View
                        style={[appStyles.modalView, appStyles.bgWhite, appStyles.p_20, appStyles.borderRadiusDefault]}>
                        <View style={appStyles.my_10}>
                            <Text style={[appStyles.boldFont,appStyles.arialFont,{fontSize:normalize(12)}]}>
                                {this.props["modalText"]}
                            </Text>
                        </View>
                        <View style={appStyles.justifyItemsCenter}>
                            <View style={appStyles.w_65}>
                                <CustomButton btnText={btnSuccessText} onPress={()=>{
                                    this.props["handleModal"]();
                                }} />
                                <CustomButton danger btnText={btnCancelText} onPress={()=>{
                                    this.props["cancelModal"]();
                                }} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}