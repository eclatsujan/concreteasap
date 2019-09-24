import config from '../config';
import * as SecureStore from 'expo-secure-store';

export async function getToken(){
    return SecureStore.getItemAsync('user_token');    
}

export function handleResponse(response){// this function handles the responses from the server
    // console.log(response);
    // console.log(response.text());
	return response.text().then(text => {

        // console.log(response);
        // console.log();
        if(text!==""){
            console.log(text);
            const data = text && JSON.parse(text);

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                console.log(data.message);
                throw "Some Issue in response";
            }
            return data;
        }
        // console.log(data);

	});
}