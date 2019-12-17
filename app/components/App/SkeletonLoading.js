import React from 'react';
import {SafeAreaView, View} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {appStyles} from "../../../assets/styles/app_styles";

export class SkeletonLoading extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={appStyles.bgWhite}>
                {[0, 1, 2, 3, 4].map((_, index) => (
                    <View key={index} style={[appStyles.my_10]}>
                        <SkeletonPlaceholder>
                            <View style={{flexDirection: "row"}}>
                                <View
                                    style={{
                                        justifyContent: "space-between",
                                        marginLeft: 12,
                                        flex: 1
                                    }}
                                >
                                    <View style={{width: "50%", marginBottom: 5, height: 20}}/>
                                    <View style={{width: "30%", marginBottom: 5, height: 20}}/>
                                    <View style={{width: "80%", marginBottom: 5, height: 20}}/>
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                    </View>
                ))}
            </View>
        );
    }
}