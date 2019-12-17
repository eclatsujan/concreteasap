import * as React from 'react';
import {ScrollView, Animated} from 'react-native';
import {View, Content} from 'native-base';

import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

//styles
import {styles} from '../../contractor/styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";

//Custom Components
import {actions} from "../../../store/modules";
import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from "../../../components/Headers/SubHeader";
import EmptyTable from "../../../components/Tables/EmptyTable";
import {notifications} from "../../../store/modules/notifications";
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";
import AppFooter from "../../../components/Footer/AppFooter";

import Notification from '../../../components/User/Notification'

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeValue: new Animated.Value(0),
            isLoading: false,
            emptyMessage: "There are no new Notifications right now.",
            transformScale: new Animated.Value(1)
        };

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.appLoading();
            this.props.getNotifications();
            this.interval = setInterval(this.props.getNotifications, 4000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });

        this.markAsRead = this.markAsRead.bind(this);
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }

    componentDidMount() {
        this.props.appLoading();
        this.props.getNotifications();
    }

    markAsRead(notification_id) {
        this.props.markAsRead(notification_id);
    }

    onRoute(notification) {
        if (!notification["route"] && !notification["params"]) return;
        let params = notification["params"];
        this.props.navigation.navigate(notification["route"], params);
    }

    displayNotifications(notifications) {
        return notifications.get("notifications").size === 0 ?
            <EmptyTable message={this.state.emptyMessage}/> :
            notifications.get("notifications").map((data, index) => {
                return (
                    <Notification style={[appStyles.bgWhite, {opacity: this.state.fadeValue}]} key={index}
                                  markAsRead={this.markAsRead} data={data} onRoute={this.onRoute}/>
                )
            })

    }

    render() {
        let notifications = this.props.notifications;
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Notifications" iconType="ConcreteASAP" iconName="bell"/>
                    <Content contentContainerStyle={styles.content}>
                        <View>
                            {this.props.app.get("loading") ? <SkeletonLoading/>
                                : this.displayNotifications(notifications)}
                        </View>
                    </Content>
                </ScrollView>
                <AppFooter/>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appLoading: () => {
            return dispatch(actions.app.loading(true));
        },
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