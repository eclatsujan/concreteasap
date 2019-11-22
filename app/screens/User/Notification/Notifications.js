import * as React from 'react';
import {ScrollView, TouchableHighlight} from 'react-native';
import {View, Button, Text, Content, Icon, Footer, FooterTab, Row, Col} from 'native-base';

import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import moment from "moment";

//styles
import {styles} from '../../contractor/styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";

//Custom Components
import {actions} from "../../../store/modules";
import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from "../../../components/Headers/SubHeader";
import EmptyTable from "../../../components/Tables/EmptyTable";
import {not} from "react-native-reanimated";

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            emptyMessage: "There are no new Notifications right now."
        };
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // this.setState({loading: true});
            this.props.getNotifications();
        });
    }

    componentDidMount() {
        this.props.getNotifications();
    }

    markAsRead(notification_id) {
        this.props.markAsRead(notification_id);
    }

    displayNotifications(notifications) {
        let instance = this;
        return !notifications["notifications"] ? null :
            notifications["notifications"].length === 0 ?
                <EmptyTable message={this.state.emptyMessage}/> :
                notifications["notifications"].map(function (data, index) {
                    return (
                        <Row key={index} style={[appStyles.bgNotification, appStyles.p_15, appStyles.bottomMarginDefault]}>
                            <Col style={appStyles.w_90}>
                                <Text style={appStyles.arialFont}>
                                    {data["notification"]["message"]}
                                </Text>
                                <Text style={appStyles.arialFont}>
                                    ({moment(data["date"]).format("YYYY-MM-DD").toString()})
                                </Text>
                            </Col>
                            <Col
                                style={[appStyles.w_10, appStyles.verticalCenter, appStyles.flex1, appStyles.verticalSelfCenter]}>
                                <TouchableHighlight onPress={() => {
                                    instance.markAsRead(data["id"])
                                }}>
                                    <Icon type="FontAwesome5" name="times" style={{fontSize:15}}/>
                                </TouchableHighlight>
                            </Col>
                        </Row>
                    )
                });
    }

    render() {
        let app = this.props.app.toJS();
        let notifications = this.props.notifications.toJS();
        console.log(notifications);
        return (
            <AppBackground loading={app.loading}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Notifications" iconType="ConcreteASAP" iconName="bell"/>
                    <Content contentContainerStyle={styles.content}>
                        <View>{this.displayNotifications(notifications)}</View>
                    </Content>
                </ScrollView>
                <Footer style={{marginBottom: 30}}>
                    <FooterTab>
                        <Button style={[appStyles.button, appStyles.buttonPrimary]}
                                onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={appStyles.buttonBlack}>Back to Home</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNotifications: () => {
            return dispatch(actions.notifications.get())
        },
        markAsRead: (notification_id) => {
            return dispatch(actions.notifications.markAsRead(notification_id))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        notifications: state.get("notifications"),
        app: state.get("app")
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Notifications));