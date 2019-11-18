import React from "react";
import {Row, Col, View, Text} from "native-base";
import {getNested, isBoolean, boolToAffirmative} from "../../helpers/app";

import {appStyles} from "../../../assets/styles/app_styles";

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

    renderRow(row) {
        return (
            <View style={appStyles.flex1}>
                {this.props["rowColumns"].map((column, index) => {
                    let columnValue = getNested(row, column["key"]);
                    return (
                        <Row key={index} style={[appStyles.py_10, appStyles.borderBottom2, appStyles.borderBlack]}>
                            <Col style={appStyles.w_65}>
                                <Text>{column["title"]}</Text>
                            </Col>
                            <Col style={appStyles.w_35}>
                                <Text style={appStyles.arialFont}>
                                    {!isBoolean(columnValue) ? columnValue : boolToAffirmative(columnValue)}
                                </Text>
                            </Col>
                        </Row>
                    )
                })}
            </View>
        );
    }


    render() {
        let bgStyle = this.props["bgStyle"] ? this.props["bgStyle"] : [appStyles.bgWhite, appStyles.p_5];
        return (
            <View style={bgStyle}>
                {this.renderRowData(this.props["rowData"])}
            </View>
        );
    }
}
