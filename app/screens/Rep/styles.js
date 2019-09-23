import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content:{
        justifyContent:"center",
        flex:1
    },
    mainTitle:{
        textAlign:"center",
        fontSize:20,
        fontWeight:'bold'
    },
    defaultMarginLT:{
        marginLeft:15,
        marginTop:15
    },
    marginL15:{
        marginTop:15
    },
    marginL20:{
        marginTop:20
    },
    displayCustomText:{
        width:"95%",
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    mainButton:{
        width:"95%",
        marginBottom:20,
        alignSelf:"center",
        paddingTop:10,
        paddingBottom:10,
    },
    mainButtonText: {
        fontSize: 20,
    },
    pickerForm:{
        fontSize: 20
    },
    modalSelector:{
        fontSize:20,
        height:30
    },
    registerButton:{
        marginTop:10,
        width: "99%",
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 10,
        borderRadius: 25,
        borderWidth: 1,
    },
    datePicker:{
        marginTop: 10,
        marginLeft: 5,
        width: "100%",
    },
    tableBorder:{
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2',
        marginLeft:10
    },
    primaryButton:{
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 180,
        marginTop: 10,
        borderRadius: 25,
        borderWidth: 1,
    }
});