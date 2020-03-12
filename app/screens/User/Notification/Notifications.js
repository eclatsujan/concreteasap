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
import AppBackground from '../../../components/App/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from "../../../components/Headers/SubHeader";
import EmptyTable from "../../../components/Basic/Tables/EmptyTable";
import {notifications} from "../../../store/modules/notifications";

import Notification from '../../../components/User/Notification'
import {NavigationActions} from "react-navigation";

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
            this.props.getNotifications();
        });

        this.blurListener=this.props.navigation.addListener("willBlur",()=>{
            this.props.stopGettingNotifications();
        });

        this.markAsRead = this.markAsRead.bind(this);
        this.onRoute = this.onRoute.bind(this);
        this.backButton=this.backButton.bind(this);
    }

    componentWillUnmount() {
        this.focusListener.remove();
        // this.blurListener.remove();
    }

    markAsRead(notification_id) {
        this.props.removeNotification(notification_id);
    }

    onRoute(notification) {

        this.props.appLoading();
        // console.log(notification);
        if (!notification?.get("route") && !notification?.get("params")) return;
        let params = notification?.get("params").toJS();
        let index=this.props.user.get('roles').findIndex((role)=>{
            return role.name==="contractor";
        });
        params["backRoute"]=index===-1?"Rep Notifications":"Notifications";

        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName:notification?.get("route"),
            params
        }));

    }

    displayNotifications(notification) {
        let notifications=notification?.get("data")?.get("entities")?.get("notifications");

        return notification?.get("data")?.get("result")?.size === 0 ?
            <EmptyTable message={this.state.emptyMessage}/> :
            notification?.get("data")?.get("result")?.map((data, index) => {
                return (
                    <Notification style={[appStyles.bgWhite, {opacity: this.state.fadeValue}]} key={index}
                                  markAsRead={this.markAsRead} data={notifications?.get(data)} onRoute={this.onRoute}/>
                )
            });
    }

    backButton(){
        this.props.navigation.navigate("Home");
    }

    render() {
        let notifications = this.props.notifications;
        return (
            <AppBackground loading={this.props.app?.get("loading")} backBtnClick={this.backButton}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Notifications" iconType="ConcreteASAP" iconName="bell"/>
                    <Content contentContainerStyle={styles.content}>
                        <View>
                            {this.displayNotifications(notifications)}
                        </View>
                    </Content>
                </ScrollView>
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
            return dispatch(actions.notifications.fetchNotifications())
        },
        stopGettingNotifications: () =>{
            return dispatch(actions.notifications.stopFetchingNotifications())
        },
        removeNotification: (notification_id) => {
            return dispatch(actions.notifications.removeNotification(notification_id))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        notifications: state.get("notifications"),
        app: state.get("app"),
        user:state.get("user")
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Notifications));