import * as React from 'react';
import {Platform, UIManager, LayoutAnimation} from 'react-native';
import {Col, Icon, Row, Text, View} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";
import {Animated, TouchableOpacity} from "react-native";
import moment from "moment";
import ButtonIcon from "../Basic/Button/ButtonIcon";

export default class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            transformScale: new Animated.Value(0),
            fadeValue: new Animated.Value(1),
            height: new Animated.Value(1),
            changed: false
        };
        this.markAsRead = this.markAsRead.bind(this);
        if (Platform["OS"] === 'android') {
            if (UIManager["setLayoutAnimationEnabledExperimental"]) {
                UIManager["setLayoutAnimationEnabledExperimental"](true);
            }
        }
    }

    markAsRead(id) {
        this.props.markAsRead(id);
    }

    onRoute(notification) {
        this.props.onRoute(notification?.get("notification"));
    }


    render() {
        let data = this.props.data;
        let notification = data?.get("notification");
        let height = this.state.height._value === 1 ? "auto" : this.state.height;
        return (
            <Animated.View style={{opacity: this.state.fadeValue, height}}>
                <Row
                    style={[appStyles.bgNotification, appStyles.p_15, appStyles.my_5]}>
                    <Col style={appStyles.w_90}>
                        <View>
                            <TouchableOpacity onPress={() => {
                                this.onRoute(data);
                            }}>
                                <View>
                                    <Text style={appStyles.arialFont}>
                                        {notification?.get("message")}
                                    </Text>
                                </View>
                                <View style={[appStyles.flexRow,appStyles.flexWrap,appStyles.verticalCenter]}>
                                    <Text style={appStyles.arialFont}>
                                        ({moment(data?.get("date")).format("DD/MM/YYYY").toString()})
                                    </Text>
                                    <View style={appStyles.pl_5}>
                                        <ButtonIcon small btnText={"View"} btnSize={10} btnIconSize={10} onPress={()=>{
                                            this.onRoute(data);
                                        }}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Col>
                    <Col
                        style={[appStyles.w_10]}>
                        <TouchableOpacity style={[appStyles.h_100, appStyles.horizontalCenter]}
                                          onPress={() => {
                                              this.markAsRead(data?.get("id"))
                                          }}>
                            <View style={[appStyles.flex1, appStyles.verticalSelfCenter,appStyles.justifyItemsCenter]}>
                                <Icon type="FontAwesome5" name="times" style={{fontSize: 15}}/>
                            </View>

                        </TouchableOpacity>
                    </Col>
                </Row>
            </Animated.View>
        );
    }

}