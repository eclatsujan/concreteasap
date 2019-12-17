export const mapBoxService = {
    searchText
};

export function searchText(search_text) {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    let search_params= {
        access_token: 'pk.eyJ1Ijoic3V6a25pZ2h0IiwiYSI6ImNrM2R3Y2czdTExcG4zZXBibWp5NTlwbngifQ.UnQPBuKWSJ0Gc1rzRIWNDQ',
        // autocomplete: true,
        country:"AU"
    };

    url=url+search_text+".json?"+getURLParam(search_params);

    return fetch(url);
}


function getURLParam(search_params){
    let esc = encodeURIComponent;
    return Object.keys(search_params)
        .map(k => esc(k) + '=' + esc(search_params[k]))
        .join('&');
}