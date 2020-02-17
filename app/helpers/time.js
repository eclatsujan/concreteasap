import moment from "moment";
import {Linking} from 'react-native'

export function formatDate(date){
    return moment(date).format("DD/MM/YYYY").toString();
}

export function customFormatDate(date){
    return moment(date,"YYYY-MM-DD").format("DD/MM/YYYY").toString();
}

export function formatTime(time){
    return moment(time, "HH:mm:ss").format("hh:mm A").toString();
}

export function formatPrice(price){
    return "$ "+price;
}

export function phoneFormat(phone_number){

}