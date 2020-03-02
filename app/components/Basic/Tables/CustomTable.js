import React from "react";
import {ActivityIndicator, TouchableWithoutFeedback} from 'react-native'
import {Row, Col, View, Text, Icon, Button} from "native-base";
import {appStyles} from "../../../../assets/styles/app_styles";
import {getNested, getNestedImmutable} from "../../../helpers/app";
import EmptyTable from "./EmptyTable";

export default class CustomTable extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        // this.renderHeader=this.renderHeader.bind(this);
    }

    renderHeaderData(headerData) {
        return !headerData ? null :
            <Row
                style={[appStyles.mx_10, appStyles.py_10, appStyles.borderBottom, appStyles.borderGray44, appStyles.verticalCenter]}>
                {headerData.map((column, index) => (
                    <Col key={index}>
                        <Text
                            style={[appStyles.upperCase, appStyles.baseSmallFontSize, appStyles.boldFont]}>{column}</Text>
                    </Col>
                ))}
                {this.props["colButtonComponent"] ? null : <Col style={appStyles.w_45}></Col>}
            </Row>
    }

    renderView(rowData) {
        try {
            return !rowData || rowData.size === 0 ? (
                <EmptyTable message={this.props["errorMsg"]}/>
            ) : this.renderTable(rowData);
        } catch (e) {
            console.log(e);
        }

    }

    renderTable(rowData) {
        return (
            <View>
                {this.renderHeaderData(this.props["rowHeaders"])}
                {rowData?.map((row, index) => {
                    return this.renderRow(row, index)
                })}
            </View>
        );
    }

    renderRow(row, index) {
        let width="40%";
        return (
            <View key={index}>
                <View
                    style={[appStyles.flex1, appStyles.mx_10, appStyles.py_5, appStyles.borderBottom, appStyles.borderGray44]}>
                    <Row style={[{alignItems:"flex-start"},appStyles.flexRow]}>
                        {this.props ["rowColumns"].map((column, index) => {
                            let columnValue = getNestedImmutable(row, column);
                            let firstValue = column === "price" ? "$" :"";
                            columnValue=firstValue!==""?firstValue+" "+columnValue:columnValue;
                            return (
                                <Col key={index}>
                                    <Text style={[appStyles.baseSmallFontSize]}>
                                        {columnValue}
                                    </Text>
                                </Col>
                            );

                        })}
                        {this.props["colButtonComponent"] ? this.props["colButtonComponent"](row) : this.showNormalButton(row)}
                    </Row>
                    {this.props["customRowComponent"] ? this.props["customRowComponent"](row) : null}
                </View>
            </View>
        );
    }

    showNormalButton(row) {
        let buttonText = this.props["buttonText"] ? this.props["buttonText"] : "View Details";
        let buttonIcon = this.props["buttonIcon"] ? this.props["buttonIcon"] : "eye";
        let buttonIconType = this.props["buttonIconType"] ? this.props["buttonIconType"] : "FontAwesome5";
        let buttonStyle = this.props["buttonStyle"] ? this.props["buttonStyle"] : [appStyles.bgBlack];
        let buttonTextStyle = this.props["buttonTextStyle"] ? this.props["buttonTextStyle"] : [appStyles.colorWhite, appStyles.baseSmallFontSize];
        return (
            <Col style={appStyles.w_45}>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.onPress(row)
                }}>
                    <View
                        style={[buttonStyle, appStyles.py_10, appStyles.borderRadiusDefault, appStyles.flexRow, appStyles.flex1, appStyles.flexWrap, appStyles.verticalCenter, appStyles.horizontalCenter]}>
                        <Icon name={buttonIcon} type={buttonIconType}
                              style={[appStyles.ft_small, buttonTextStyle, appStyles.pr_5]}/>
                        <Text style={[buttonTextStyle, appStyles.boldFont]}>{buttonText}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Col>
        );
    }

    render() {
        let isLoading = this.props["isLoading"] ? this.props["isLoading"] : false;
        let bgStyle = this.props["bgStyle"] ? this.props["bgStyle"] : [appStyles.bgWhite];
        return (
            <View style={bgStyle}>
                {!isLoading ? this.renderView(this.props["rowData"]) : <ActivityIndicator size="large"/>}
            </View>
        );
    }
}
