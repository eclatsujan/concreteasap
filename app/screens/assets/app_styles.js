import {StyleSheet,PixelRatio} from 'react-native';
import {Dimensions} from 'react-native';

let {height, width} = Dimensions.get('window');

export const IMAGE_HEIGHT = width / 2;
export const IMAGE_HEIGHT_SMALL = width / 7;

export const COLOR_PRIMARY="#14E22A";
export const COLOR_SECONDARY="#2E2E2E";
export const COLOR_BLACK="#000000";
export const COLOR_GRAY44="#707070";
export const COLOR_WHITE="#FFFFFF";
export const COLOR_DANGER="#B00020";

export const appStyles = StyleSheet.create({

    imageBg: {
        width,
        height
    },
    appHeader: {
        width: 125,
        height: 75,
        resizeMode: 'contain',
    },
    headerHeight: {
        height: 85
    },
    customMargin: {
        marginTop: 30,
        marginBottom: 30
    },
    mt_1: {
        // marginTop:10
    },
    baseFontSize:{
      fontSize:13
    },
    baseFont: {
        fontFamily: "Hancock"
    },
    defaultFont:{
        fontFamily:"Roboto"
    },
    bgTransparent: {
        backgroundColor: 'transparent',
    },
    bgPrimary: {
        backgroundColor: COLOR_PRIMARY
    },
    bgSecondary: {
        backgroundColor: COLOR_SECONDARY
    },
    bgWhite: {
        backgroundColor: COLOR_WHITE
    },
    bgBlack:{
      backgroundColor:COLOR_BLACK
    },
    bgError: {
        backgroundColor: "#B00020"
    },
    bgNotification: {
        backgroundColor: "#CFFFD3"
    },
    colorPrimary: {
        color: COLOR_PRIMARY
    },
    colorWhite: {
        color: COLOR_WHITE
    },
    colorGray44: {
        color: COLOR_GRAY44
    },
    colorBlack: {
        color: COLOR_BLACK
    },
    flex1: {
        flex: 1
    },
    flex3: {
        flex: 3
    },
    selfCenter:{
      alignSelf: "center"
    },
    capitalCase: {
        textTransform: "capitalize"
    },
    upperCase:{
        textTransform:"uppercase"
    },
    borderPrimary:{
      borderColor:COLOR_PRIMARY
    },
    borderTransparent: {
        borderColor: 'transparent'
    },
    btnGray: {
        backgroundColor: COLOR_SECONDARY,
        marginBottom: 7
    },
    paddingYDefault: {
        paddingTop: 7,
        paddingBottom: 7
    },
    marginDefault: {
        marginTop: 7,
        marginBottom: 7,
    },
    mt_10: {
        marginTop: 10
    },
    my_5:{
        marginTop:5,
        marginBottom:5
    },
    my_10:{
        marginTop:10,
        marginBottom:10
    },
    my_30: {
        marginBottom: 30,
        marginTop: 30
    },
    mb_10: {
        marginBottom: 10
    },
    mb_30: {
        marginBottom: 30
    },
    marginAppDefault: {
        // marginLeft:20,
        // marginRight:20
    },
    paddingAppDefault: {
        // paddingLeft:10,
        // paddingRight:10
    },
    borderRadiusDefault: {
        borderRadius: 7
    },
    ft_small:{
      fontSize:PixelRatio.get()<2?10:10
    },
    ft_20:{
      fontSize:20
    },
    p_5: {
        padding: 5
    },
    p_10:{
        padding:10
    },
    p_15: {
        padding: 15
    },
    pt_5: {
        paddingTop: 5,
    },
    pt_15:{
      paddingTop:15
    },
    pb_5:{
        paddingBottom:5
    },
    pb_15: {
        paddingBottom: 15
    },
    pb_30: {
        paddingBottom: 30
    },
    pb_45: {
        paddingBottom: 45
    },
    pl_5: {
        paddingLeft: 5
    },
    pr_5: {
        paddingRight: 5
    },
    py_5:{
      paddingTop:5,
      paddingBottom:5
    },
    py_10:{
      paddingTop:10,
      paddingBottom:10
    },
    py_15: {
        paddingTop: 15,
        paddingBottom: 15
    },
    w_100: {
        width: "100%"
    },
    w_10:{
        width:"10%"
    },
    w_25:{
        width:"20%"
    },
    w_35: {
        width: "35%"
    },
    w_50:{
      width:"50%"
    },
    w_65: {
        width: "65%"
    },
    w_75:{
        width:"75%",
    },
    w_90:{
      width:"90%"
    },
    //relative
    relative:{
        position:"relative"
    },
    right_5:{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%"
    },
    margin_3: {
        marginTop: 2,
        marginBottom: 2
    },
    iconCol: {
        width: "15%",
        paddingLeft: 10
    },
    subHeaderTxtCol: {
        width: "85%",
    },
    subHeaderTxt: {
        textAlign: "center",
        fontSize: PixelRatio.get()<2?13:17,
        textTransform: "uppercase"
    },
    marginXDefault: {
        marginTop: 10,
        marginBottom: 10
    },
    mx7: {
        marginTop: 7,
        marginBottom: 7
    },
    paddingXDefault: {
        paddingTop: 15,
        paddingBottom: 15
    },
    paddingX7: {
        paddingTop: 7,
        paddingBottom: 7
    },
    border2:{
        borderTopWidth:2,
        borderBottomWidth:2,
        borderLeftWidth:2,
        borderRightWidth:2
    },
    borderX2:{
      borderTopWidth:2,
      borderBottomWidth:2
    },
    borderBottom: {
        borderBottomWidth: 2,
        borderColor: "#000000"
    },
    borderBlack:{
        borderColor:"#000000"
    },
    content: {
        // flex:1,
    },
    contentCenter: {
        // flex:1,
        // alignSelf:"center",
        alignItems: "center",
    },
    justifyItemsCenter: {
        justifyContent: 'center',
        // alignItems: 'center',
        textAlign: "center"
    },
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    subHeader: {
        position: "relative",
        paddingTop: 25,
        paddingBottom: 25,
        alignItems: "center",
        // paddingLeft:25,
        // paddingRight:25,
        backgroundColor: 'transparent',
    },
    customPadding: {
        paddingTop: 5,
        paddingBottom: 5
    },
    inputForm: {},
    logo: {
        width: 200,
        height: 175,
        resizeMode: 'contain'
    },
    logoHeader: {
        width: 200,
        height: 125,
        resizeMode: 'contain',
        marginBottom: 10
    },
    headerIcon: {
        fontSize: 40,
    },
    loginForm: {
        // marginTop:5,
    },
    loginInput: {
        backgroundColor: COLOR_WHITE,
        marginTop: 7,
        marginBottom: 7,
        borderRadius: 4,
        marginLeft: 0,
        marginRight: 0,
        borderColor: COLOR_PRIMARY,
        borderWidth: 2,
        width: "100%"
    },
    loginInputBox: {
        fontSize: 14,
    },

    btnPadding: {
        marginTop: 15,
        marginBottom: 15,
        paddingTop: 20,
        paddingBottom: 20
    },
    btnTxt: {
        color: COLOR_BLACK,
        fontSize: 15,
        fontFamily: "Hancock"
    },
    btnInverseColor: {
        color: "#fff"
    },
    btnLargeTxt: {
        color: COLOR_PRIMARY,
        fontSize: 20,
        fontFamily: "Hancock"
    },
    txtCenter: {
        textAlign: "center",
    },
    flexRow: {
        flex: 1,
        flexDirection: "row"
    },
    flexCenter: {
        alignItems: "center",
        justifyContent: "center"
    },
    verticalCenter: {
        alignItems: "center",
    },
    verticalSelfCenter:{
      alignSelf:"center"
    },
    horizontalCenter: {
        justifyContent: "center"
    },
    appMargin: {
        marginLeft: PixelRatio.get()<=2?10:20,
        marginRight: PixelRatio.get()<=2?10:20
    },
    circle: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        borderColor: COLOR_PRIMARY,
        borderWidth: 2
    },
    orderBorder:{

    },
    button: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 4,
    },
    buttonPrimary: {
        backgroundColor: COLOR_PRIMARY,
        color: COLOR_SECONDARY
    },
    buttonSecondary: {
        backgroundColor: COLOR_SECONDARY,
        borderWidth: 2,
        borderColor: COLOR_PRIMARY
    },
    buttonBlack: {
        color: COLOR_BLACK
    },
    buttonHomeTxt: {
        color: COLOR_PRIMARY,
        textTransform: "uppercase",
        fontSize: 13
    },
    buttonHomeIcon: {
        color: COLOR_PRIMARY,
    }
});
