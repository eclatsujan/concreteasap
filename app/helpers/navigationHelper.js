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
            routeName: routeName,
            params:params,
        })
    );
}

export function resetHomeNavigation(routeName, params) {
    const resetActions = NavigationActions.reset({
        index: 1,
        // key:"Accepted Orders",
        actions: [NavigationActions.navigate({routeName: "Home"}), NavigationActions.navigate({
            routeName,
            params
        })]
    });

    _navigator.dispatch(resetActions);
}

export function addParamForNavigation(params){
    _navigator.dispatch(NavigationActions.setParams(params));
}

export function resetNavigation(routeName,key=null,index=0,params={}) {
    _navigator.dispatch(StackActions.reset({
        index: index,
        key: key,
        actions: [NavigationActions.navigate({routeName: routeName,params})]
    }))
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

// function setState(){
//     _navigator.dispatch(
//         DrawerActions.
//     );
// }

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    openDrawer,
    resetHomeNavigation,
    resetNavigation,
    goBack,
    addParamForNavigation
};