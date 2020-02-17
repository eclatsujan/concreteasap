import React from "react";
import {ScrollView, StatusBar, TouchableWithoutFeedback} from "react-native";
import {appStyles} from "../../../assets/styles/app_styles";
import {SafeAreaView} from "react-navigation";
import {Icon, Text, View} from "native-base";
import {DrawerActions, DrawerNavigatorItems} from "react-navigation-drawer";
import {evaluateChildDrawerTitle, evaluateOuterDrawerListItems} from "../../helpers/menu";
import OuterDrawerItem from "../Menu/OuterDrawerItem";
import DrawerHeader from "../Menu/DrawerHeader";
import {actions} from "../../store/modules";
import {connect} from "react-redux";
import {resetNavigation} from "../../helpers/navigationHelper";

class MainSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainDrawer: true,
            currentComponent: '',
        };
        this.resetTopNavigation = this.resetTopNavigation.bind(this);
        this.navigateToCallback = this.navigateToCallback.bind(this);
        this.closeSubMenu = this.closeSubMenu.bind(this);
    }

    resetTopNavigation(route, focused) {
        console.log(route);
        // resetNavigation(route,null);
        // this.props.navigation.navigate({
        //     routeName: route.route.routeName
        // });
        // this.props.appLoading();
        // this.toggleMainDrawer();
    }


    navigateToCallback(routeName) {
        this.setState({mainDrawer: true});
        this.props.navigation.navigate(routeName);
    }

    toggleMainDrawer = () =>
        this.setState(prevState => ({mainDrawer: !prevState.mainDrawer}));

    renderMainDrawerComponents = mainDrawerItems =>
        Object.keys(mainDrawerItems).map(item => (
            <OuterDrawerItem
                key={item}
                label={item}
                onPress={() => {
                    this.setState({
                        currentComponent: item,
                        mainDrawer: false,
                    });
                }}
            />
        ));

    closeSubMenu() {
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    render() {
        const {items} = this.props;
        const scopedItemsObject = evaluateOuterDrawerListItems(items);
        const {mainDrawer, currentComponent} = this.state;
        if (mainDrawer) {
            return (
                <ScrollView style={[{paddingTop: StatusBar.currentHeight}, appStyles.bgBlack]}>
                    <SafeAreaView
                        forceInset={{top: 'always', horizontal: 'never'}}
                    >
                        <TouchableWithoutFeedback onPress={this.closeSubMenu}>
                            <View style={[appStyles.mr_10, appStyles.flexRow, appStyles.justifyRight]}>
                                <Icon type={"FontAwesome"} name={"close"} style={[appStyles.colorWhite]}/>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate("Main Home");
                            this.closeSubMenu();
                        }}>
                            <View
                                style={[appStyles.py_15, appStyles.ml_20, appStyles.borderGray44, appStyles.borderBottom, appStyles.w_100]}>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.upperCase, appStyles.boldFont]}>
                                    {"Home"}
                                </Text>
                            </View>

                        </TouchableWithoutFeedback>

                        {this.renderMainDrawerComponents(scopedItemsObject)}

                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate("User Profile");
                            this.closeSubMenu();
                            // this.toggleMainDrawer();
                        }}>
                            <View
                                style={[appStyles.py_15, appStyles.ml_20, appStyles.borderGray44, appStyles.borderBottom, appStyles.w_100]}>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.upperCase, appStyles.boldFont]}>
                                    {"User Profile"}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate("Logout");
                            this.closeSubMenu();
                            // this.toggleMainDrawer();
                        }}>
                            <View
                                style={[appStyles.py_15, appStyles.ml_20, appStyles.borderGray44, appStyles.borderBottom, appStyles.w_100]}>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.upperCase, appStyles.boldFont]}>
                                    {"Logout"}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
                </ScrollView>
            );
        }
        const index = scopedItemsObject[currentComponent];

        const scopedItemsArr = items.slice(index.start, index.end);

        console.log(scopedItemsArr);

        return (
            <ScrollView style={[{paddingTop: StatusBar.currentHeight}, appStyles.bgBlack]}>
                <SafeAreaView
                    forceInset={{top: 'always', horizontal: 'never'}}
                >
                    <TouchableWithoutFeedback onPress={this.closeSubMenu}>
                        <View style={[appStyles.mr_10, appStyles.flexRow, appStyles.justifyRight]}>
                            <Icon type={"FontAwesome"} name={"close"} style={[appStyles.colorWhite]}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <DrawerHeader navigateToCallback={this.navigateToCallback}/>

                    <DrawerNavigatorItems {...{...this.props, onItemPress: this.resetTopNavigation}}
                                          items={scopedItemsArr}
                                          getLabel={(scene) => {
                                              return (
                                                  <View
                                                      style={[appStyles.py_15, appStyles.ml_20, appStyles.borderGray44, appStyles.borderBottom, appStyles.w_100]}>
                                                      <Text
                                                          style={[appStyles.colorPrimary, appStyles.upperCase, appStyles.boldFont]}>
                                                          {this.props.getLabel(scene)}
                                                      </Text>
                                                  </View>
                                              )
                                          }}/>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appLoading: async () => {
            return await dispatch(actions.app.loading())
        }
    }
};

export default connect(null, mapDispatchToProps)(MainSidebar);
