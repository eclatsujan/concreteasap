import React from "react";
import {Row, Col, View, Text, Icon, Button} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";

export default class StatusRow extends React.Component {

    render(){
         return (
            <Row style={appStyles.my_5}>
                <Col>
                    <View style={[appStyles.verticalCenter,appStyles.flexRow]}>
                        <Text style={[appStyles.baseSmallFontSize,appStyles.boldFont]}>Status: </Text>
                        <Text style={[appStyles.ft_small]}>{this.props.status}</Text>
                    </View>

                </Col>
                <Col>
                    <Button style={[appStyles.bgBlack,appStyles.borderRadiusDefault]} onPress={()=>{
                        this.props["onBtnClick"](this.props.row)
                    }}>
                        <View
                            style={[appStyles.flexRow, appStyles.flexWrap, appStyles.verticalCenter, appStyles.horizontalCenter]}>
                            <Icon name={"eye"} type={"FontAwesome5"}
                                  style={[appStyles.ft_small, appStyles.colorWhite, appStyles.pr_5]}/>
                            <Text style={[appStyles.colorWhite,appStyles.baseSmallFontSize]}>View</Text>
                        </View>
                    </Button>
                </Col>
            </Row>
        );
    }
}