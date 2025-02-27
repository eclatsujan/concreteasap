import * as appActions from '../store/modules/app/actions';

export function handleResponse(response){// this function handles the responses from the server
    const contentType = response.headers.get("content-type");
    return response.text().then(text => {
        // console.log(text);
        if(text!==""&&contentType && contentType.indexOf("application/json") !== -1){
            // console.log(text);
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                throw data;
            }
            return data;
        }
        else{
            // console.log(text);
            throw {"message":"Some issue occured in server"}
        }
    });
}

export function getDefaultOptions(){

}

export function errorHandler(err,dispatch){
    dispatch(appActions.loading());
}
