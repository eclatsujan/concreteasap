const APP_DEBUG=false;

let MAIN_URL="https://appconcrete.com/api/";
if(APP_DEBUG){
    MAIN_URL="https://staging.appconcrete.com/api/";
}

export const CONTRACTOR_PREFIX_URI=MAIN_URL+"contractor/";
export const REP_PREFIX_URI=MAIN_URL+"rep/";
export const AUTH_PREFIX_URI=MAIN_URL+"auth/";
export const USER_PREFIX_URI=MAIN_URL+"user/";

export const COMMON_PREFIX_URI=MAIN_URL;
