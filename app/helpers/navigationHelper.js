// NavigationService.js

import {NavigationActions, StackActions} from 'react-navigation';

import {DrawerActions} from "react-navigation-drawer";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

export function resetHomeNavigation(routeName, params){
    // console.log(NavigationActions);
    const resetActions=NavigationActions.reset({
        index:1,
        // key:"Accepted Orders",
        actions:[NavigationActions.navigate({routeName:"Home"}),NavigationActions.navigate({
            routeName,
            params
        })]
    });

    _navigator.dispatch(resetActions);
}

function goBack() {
    return _navigator.dispatch(
        NavigationActions.back()
    );
}

function openDrawer() {
    _navigator.dispatch(
        DrawerActions.openDrawer()
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    openDrawer,
    resetHomeNavigation,
    goBack
};