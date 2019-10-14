import config from '../config';
import * as SecureStore from 'expo-secure-store';

export async function getToken(){
    return SecureStore.getItemAsync('user_token');    
}

export function handleResponse(response){// this function handles the responses from the server
    const contentType = response.headers.get("content-type");  
	return response.text().then(text => {
        console.log(text);
        if(text!==""&&contentType && contentType.indexOf("application/json") !== -1){

            // console.log(text);
            const data = text && JSON.parse(text);

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                // console.log(data.message);
                throw "Some Issue in response";
            }
            return data;
        }
        else{
            throw {"error_message":"Not a Json data"}
        }
        // console.log(data);

	}).catch((err)=>{
        console.log(err);
    });
}