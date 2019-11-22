import * as React from 'react';
import {View, Row, Col, Text} from 'native-base';
import ButtonIcon from "../../Button/ButtonIcon";
import {appStyles} from "../../../../assets/styles/app_styles";

export default class OrderView extends React.Component {

    constructor(props){
        super(props)
    }

    getColor(status) {
        let status_colors = {"Complete": "#2E7400", "Cancelled": "#FF0000"};
        let color = status_colors[status] ? status_colors[status] : "#000000";
        return {color};
    }

    render() {
        return (
            <View key={this.props["order"]["order_id"]} style={[appStyles.py_5,appStyles.borderBottom,appStyles.mx_5]}>
                <Row >
                    <View style={[appStyles.flexRow,appStyles.pb_5]}>
                        <View style={[appStyles.flexRow,{alignItems:"flex-end"}]}>
                            <Text style={[appStyles.baseSmallFontSize,appStyles.upperCase]}>Order ID:# </Text>
                            <Text style={[appStyles.arialFont,appStyles.baseSmallFontSize]}>{this.props["order"]["id"]}</Text>
                            <Text style={[appStyles.baseSmallFontSize,appStyles.pl_20,appStyles.upperCase]}>
                                Status:
                            </Text>
                            <Text style={[appStyles.pl_5,appStyles.baseSmallFontSize,appStyles.arialFont,this.getColor(this.props["order"]["status"])]}>
                                {this.props["order"]["status"]}
                            </Text>
                        </View>
                    </View>
                </Row>
                {this.props["order"]["status"] === "Complete" || this.props["order"]["status"] === "Cancelled" ?
                    <Row style={[appStyles.pb_5]}>
                        <Col>
                            <View style={[appStyles.flexRow]}>
                                <Text style={[appStyles.baseSmallFontSize,appStyles.upperCase]}>Company:</Text>
                                <Text style={[appStyles.arialFont,appStyles.baseSmallFontSize]}>{this.props["order"["id"]]}</Text>
                            </View>
                        </Col>
                    </Row>
                    : null}
                <View style={[appStyles.flexRow,appStyles.py_5]}>
                    <View style={appStyles.pr_5}>
                        <ButtonIcon small
                            btnText={this.props["buttonViewText"]}
                            onPress={()=>{
                                this.props["onViewHandler"](this.props["order"])
                            }}/>

                    </View>
                    <View style={appStyles.pr_5}>
                        <ButtonIcon small
                                    btnText={"Archive"}
                                    iconName={"archive"}
                                    btnBgColor={"#707070"}
                                    onPress={()=>{
                                        this.props["onArchiveHandler"](this.props["order"]);
                                    }}/>
                    </View>
                    <View>
                        <ButtonIcon small
                                    btnText={"View Details"}
                                    onPress={()=>{
                                        this.props["onArchiveHandler"](this.props["order"]);
                                    }}/>
                    </View>
                </View>
            </View>
        );
    }

}