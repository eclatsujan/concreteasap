import React from "react";
import {ActivityIndicator} from 'react-native'
import {Row, Col, View, Text, Icon, Button} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";
import {getNested} from "../../helpers/app";

export default class CustomTableWithStatus extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    renderHeaderData(headerData) {
        return !headerData ? null : <Row>
            {headerData.map((column, index) => (
                <Col key={index}>
                    <Text style={[appStyles.upperCase,appStyles.baseFontSize]}>{column}</Text>
                </Col>
            ))}
        </Row>
    }

    renderRowData(rowData) {
        try {
            return !rowData ? null : rowData.map((row, index) => {
                return this.renderRow(row, index)
            });
        } catch (e) {
            console.log(e);
        }

    }

    renderRow(row, index) {
        let buttonText = this.props["buttonText"] ? this.props["buttonText"] : "View Details";
        let buttonIcon = this.props["buttonIcon"] ? this.props["buttonIcon"] : "eye";
        let buttonIconType = this.props["buttonIconType"] ? this.props["buttonIconType"] : "FontAwesome5";
        let buttonStyle = this.props["buttonStyle"] ? this.props["buttonStyle"] : [appStyles.bgBlack];
        let buttonTextStyle = this.props["buttonTextStyle"] ? this.props["buttonTextStyle"] : [appStyles.colorWhite];
        return (
            <View key={index} style={appStyles.flex1}>
                <Row style={[appStyles.p_5, appStyles.borderX2, appStyles.borderBlack, appStyles.my_5]}>
                    {this.props ["rowColumns"].map((column, index) => {
                        let columnValue = getNested(row, column);
                        return (
                            <Col key={index}>
                                <Text style={appStyles.baseFontSize}>{columnValue}</Text>
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
                <View
                    style={[appStyles.horizontalCenter, appStyles.w_50, appStyles.justifyItemsCenter, appStyles.selfCenter]}>
                    <Button style={[buttonStyle, appStyles.flex1, appStyles.selfCenter]}
                            onPress={() => {
                                this.props.onPress(row)
                            }}>
                        <Text style={buttonTextStyle}>
                            <Icon name={buttonIcon} type={buttonIconType}
                                  style={[appStyles.ft_small, buttonTextStyle, appStyles.pr_5]}/>
                            {buttonText}
                        </Text>
                    </Button>
                </View>
            </View>
        );
    }

    render() {
        let isLoading = this.props["isLoading"] ? this.props["isLoading"] : false;
        let bgStyle = this.props["bgStyle"] ? this.props["bgStyle"] : [appStyles.bgWhite, appStyles.p_5];
        return (
            <View style={bgStyle}>
                {this.renderHeaderData(this.props["rowHeaders"])}
                {!isLoading ? this.renderRowData(this.props["rowData"]) : <ActivityIndicator size="large"/>}
            </View>
        );
    }
}
