import { StyleSheet } from 'react-native';
import {StatusBar} from 'react-native';
import {Dimensions} from 'react-native';
let { height, width } = Dimensions.get('window');
import Constants from 'expo-constants';
export const appStyles = StyleSheet.create({
    imageBg:{
        width,
        height
    },
    appHeader:{
      height:125
    },
    headerHeight:{
  		height:100
  	},
    logoHeader:{
      paddingTop:10,
      paddingBottom:10
    },
    customMargin:{
      marginTop:30,
      marginBottom:30
    },
    baseFont:{
        fontFamily:"Hancock"
    },
    bgTransparent:{
        backgroundColor:'transparent',
    },
    bgPrimary:{
        backgroundColor:"#14E22A"
    },
    bgWhite:{
        backgroundColor:"#fff"
    },
    colorGray44:{
      color:"#707070"
    },
    colorBlack:{
        color:"#000"
    },
    flex1:{
        flex:1
    },
    flex3:{
      flex:3
    },
    btnGray:{
        backgroundColor:"#2E2E2E",
        marginBottom:7
    },
    paddingYDefault:{
        paddingTop:7,
        paddingBottom:7
    },
    marginDefault:{
        marginTop:7,
        marginBottom:7,
    },
    marginAppDefault:{
      marginLeft:20,
      marginRight:20
    },
    paddingAppDefault:{
      paddingLeft:10,
      paddingRight:10
    },
    borderRadiusDefault:{
        borderRadius:7
    },
    container:{
        backgroundColor:'transparent',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center"
    },
    subHeader:{
        position:"relative",
        paddingTop:25,
        paddingBottom:25,
        alignItems:"center",
        paddingLeft:25,
        paddingRight:25,
        backgroundColor: 'transparent',
    },
    customPadding:{
      paddingTop:5,
      paddingBottom:5
    },
    iconCol:{
        width:"15%",
    },

    subHeaderTxtCol:{
        width:"85%",
    },
    subHeaderTxt:{
        textAlign:"center",
        fontSize:17,
        textTransform:"uppercase"
    },
    paddingDefault:{
        paddingLeft:20,
        paddingRight:20
    },
    content:{
        flex:1,
        // justifyContent:"center",
    },
    contentCenter:{
        flex:1,
        alignItems:"center",
    },
    justifyItemsCenter:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:"center"
    },
    inputForm:{

    },
    logo:{
        width: 200,
        height: 175,
        resizeMode: 'contain'
    },
    logoHeader:{
        width:125,
        height:75,
        resizeMode:'contain'
    },
    headerIcon:{
        // position:"absolute",
        // left:15,
        fontSize:50,
    },
    loginForm:{
        marginTop:5,
        paddingLeft:20,
        paddingRight:20
    },
    loginInput:{
        backgroundColor:"#fff",
        marginTop:7,
        marginBottom:7,
        borderRadius:4,
        paddingLeft:5,
        paddingRight:5
    },
    loginInputBox:{
      fontSize:14,
    },
    button:{
        marginTop:15,
        marginBottom:15,
        borderRadius: 7,
        backgroundColor:"#14E22A",
        paddingTop:5,
        paddingBottom:5
    },
    btnPadding:{
      marginTop:15,
      marginBottom:15
    },
    btnTxt:{
        color:"#000",
        fontSize:20,
        fontFamily:"Hancock"
        // fontWeight:"bold"
    },
    btnInverseColor:{
        color:"#fff"
    },
    btnLargeTxt:{
        color:"#14E22A",
        fontSize:20,
        fontFamily:"Hancock"
    },
    txtCenter:{
        textAlign:"center",
    }
});
