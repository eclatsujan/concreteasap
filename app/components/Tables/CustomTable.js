import React from "react";
import {ActivityIndicator} from 'react-native'
import {Row, Col, View, Text, Icon, Button} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";
import {getNested} from "../../helpers/app";

export default class CustomTable extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    renderHeaderData(headerData) {
        return !headerData ? null :
            <Row style={[appStyles.mx_5,appStyles.py_5, appStyles.borderBottom, appStyles.borderGray44, appStyles.verticalCenter]}>
            {headerData.map((column, index) => (
                <Col key={index}>
                    <Text style={[appStyles.upperCase, appStyles.baseSmallFontSize]}>{column}</Text>
                </Col>
            ))}
            {this.props["colButtonComponent"] ? null : <Col style={appStyles.w_45}></Col>}
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
        return (

            <View key={index} style={[appStyles.flex1,appStyles.mx_5,appStyles.py_5, appStyles.borderBottom, appStyles.borderGray44]}>
                <Row style={[appStyles.verticalCenter]}>
                    {this.props ["rowColumns"].map((column, index) => {
                        let columnValue = getNested(row, column);
                        return (
                            <Col key={index}>
                                <Text style={[appStyles.baseSmallFontSize]}>{columnValue}</Text>
                            </Col>
                        )
                    })}
                    {this.props["colButtonComponent"] ? this.props["colButtonComponent"](row) : this.showNormalButton(row)}
                </Row>
                {this.props["customRowComponent"] ? this.props["customRowComponent"](row) : null}
            </View>
        );
    }

    showNormalButton(row) {
        let buttonText = this.props["buttonText"] ? this.props["buttonText"] : "View Details";
        let buttonIcon = this.props["buttonIcon"] ? this.props["buttonIcon"] : "eye";
        let buttonIconType = this.props["buttonIconType"] ? this.props["buttonIconType"] : "FontAwesome5";
        let buttonStyle = this.props["buttonStyle"] ? this.props["buttonStyle"] : [appStyles.bgBlack];
        let buttonTextStyle = this.props["buttonTextStyle"] ? this.props["buttonTextStyle"] : [appStyles.colorWhite,appStyles.baseSmallFontSize];
        return (
            <Col style={appStyles.w_45}>
                <Button style={[buttonStyle, appStyles.flex1, appStyles.selfCenter, appStyles.borderRadiusDefault]}
                        onPress={() => {
                            this.props.onPress(row)
                        }}>
                    <View
                        style={[appStyles.flexRow, appStyles.flexWrap, appStyles.verticalCenter, appStyles.horizontalCenter]}>
                        <Icon name={buttonIcon} type={buttonIconType}
                              style={[appStyles.ft_small, buttonTextStyle, appStyles.pr_5]}/>
                        <Text style={buttonTextStyle}>{buttonText}</Text>
                    </View>
                </Button>
            </Col>
        );
    }

    render() {
        let isLoading = this.props["isLoading"] ? this.props["isLoading"] : false;
        let bgStyle = this.props["bgStyle"] ? this.props["bgStyle"] : [appStyles.bgWhite];
        return (
            <View style={bgStyle}>
                {this.renderHeaderData(this.props["rowHeaders"])}
                {!isLoading ? this.renderRowData(this.props["rowData"]) : <ActivityIndicator size="large"/>}
            </View>
        );
    }
}
