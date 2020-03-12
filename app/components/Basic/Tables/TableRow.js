import React from "react";
import {Row, Col, View, Text} from "native-base";
import {getNested, isBoolean, boolToAffirmative, getNestedImmutable} from "../../../helpers/app";

import {appStyles} from "../../../../assets/styles/app_styles";

export default class TableRow extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    renderRowData(rowData) {
        try {
            return !rowData ? null : this.renderRow(rowData);
        } catch (e) {
            console.log(e);
        }
    }

    formatValue(value,format){
        if(format){
            value=format(value);
        }
        return value;
    }

    renderRow(row) {
        return (
            <View style={[appStyles.flex1]}>
                {this.props["rowColumns"].map((column, index) => {
                    let columnValue=getNestedImmutable(row,column["key"]);
                    columnValue=this.formatValue(columnValue,column["format"]);
                    if(column.hasOwnProperty("secondValue")){
                        let secondValue=getNestedImmutable(row,column["secondValue"]);
                        // console.log(row);
                        secondValue=this.formatValue(secondValue,column["secondValueFormat"]);
                        columnValue=columnValue+column["seperator"]+secondValue;
                    }
                    return (
                        columnValue?<Row key={index} style={[appStyles.verticalCenter,appStyles.py_10, appStyles.borderBottom, appStyles.borderGray44]}>
                            <Col style={appStyles.w_60}>
                                <Text style={[appStyles.upperCase,appStyles.baseSmallFontSize,appStyles.boldFont]}>
                                    {column["title"]}
                                </Text>
                            </Col>
                            <Col style={appStyles.w_40}>
                                <Text style={[appStyles.arialFont,appStyles.baseSmallFontSize]}>
                                    {columnValue}
                                </Text>
                            </Col>
                        </Row>
                            :null);
                })}
            </View>
        );
    }


    render() {
        let bgStyle = this.props["bgStyle"] ? this.props["bgStyle"] : [appStyles.bgWhite,appStyles.p_10];
        return (
            <View style={bgStyle}>
                {this.renderRowData(this.props["rowData"])}
            </View>
        );
    }
}
