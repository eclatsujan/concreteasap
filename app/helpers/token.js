import config from '../config';
import * as SecureStore from 'expo-secure-store';

export async function getToken(){
    return SecureStore.getItemAsync('user_token');
}

export function handleResponse(response){// this function handles the responses from the server
    const contentType = response.headers.get("content-type");


	return response.text().then(text => {
        if(text!==""&&contentType && contentType.indexOf("application/json") !== -1){
            const data = text && JSON.parse(text);

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;

                throw data;
            }
            return data;
        }
        else{
            throw {"message":"Some issue occured in server"}
        }
        // console.log(data);

	});
}
