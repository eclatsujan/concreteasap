import * as React from 'react';
import {View, Thumbnail,Text} from 'native-base';
import {appStyles} from "../../../assets/styles/app_styles";

export class UserContactDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    displayDetail(row, rowColumns) {
        return row.length === 0 ? null : rowColumns.map((val,index) => {
            return (
                <View key={index} style={[appStyles.mb_5,appStyles.borderBottom,appStyles.borderGray44]}>
                    <View>
                        <Text style={[appStyles.boldFont]}>{val["title"]}</Text>
                    </View>
                    <View>
                        <Text>{row.get(val["key"])}</Text>
                    </View>
                </View>
            );
        });
    }

    render() {
        return (
            <View style={[appStyles.bgWhite, appStyles.p_10]}>
                <View style={[appStyles.flex, appStyles.verticalCenter]}>
                    <View>
                        <Thumbnail large source={{uri: this.props?.["userProfile"]}}/>
                    </View>
                </View>
                <View>
                    {this.displayDetail(this.props.row, this.props.rowColumns)}
                </View>
            </View>
        );
    }
}