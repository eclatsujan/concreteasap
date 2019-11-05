// NavigationService.js

import {NavigationActions, StackActions} from 'react-navigation';

import {DrawerActions} from "react-navigation-drawer";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        StackActions.reset({
                index: 0,
                key:null,
                actions: [
                    NavigationActions.navigate({
                        routeName,
                        params,
                    })
                ]
            },
        )
    );
}

// function getParam(paramName){
//     console.log(_navigator);
//    return _navigator.dispatch(NavigationActions.);
// }

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
    // getParam,
    goBack
};