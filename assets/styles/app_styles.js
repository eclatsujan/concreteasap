import {StyleSheet, PixelRatio} from 'react-native';
import {Dimensions} from 'react-native';

let {height, width} = Dimensions.get('window');

export const IMAGE_HEIGHT = width / 2;
export const IMAGE_HEIGHT_SMALL = width / 7;

const isMDPI = PixelRatio.get() === 1;
const isHDPI = PixelRatio.get() === 1.5;
//for iphone 4 to 8 and android xHPI
const isXHDPI = PixelRatio.get() === 2;
//for iphone 8 to iphone X and android xxHPI
export const isXXHDPI = PixelRatio.get() === 3;
//for iphone 8 to iphone X and android xxxHPI
export const isXXXHDPI = PixelRatio.get() === 3.5;


export const appStyles = StyleSheet.create({
    //Base Size
    baseFontSize: {
        fontSize: (isMDPI) ? 13 : 15
    },
    baseSmallFontSize: {
        fontSize: (isMDPI || isHDPI) ? 10 : 13
    },
    baseLargeFontSize: {
        fontSize: 18
    },
    baseExtraLargeFontSize:{
        fontSize:25
    },
    baseFont: {
        fontFamily: "Hancock"
    },
    defaultFont: {
        fontFamily: "Roboto"
    },
    arialFont: {
        fontFamily: "Arial"
    },
    defaultCircle: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    inputHeightBase: {
        minHeight: 50
    },
    //Background
    bgTransparent: {
        backgroundColor: 'transparent',
    },
    bgPrimary: {
        backgroundColor: "#14E22A"
    },
    bgSecondary: {
        backgroundColor: "#2E2E2E"
    },
    bgWhite: {
        backgroundColor: "#ffffff"
    },
    bgBlack: {
        backgroundColor: "#000000"
    },
    bgError: {
        backgroundColor: "#B00020"
    },
    bgNotification: {
        backgroundColor: "#CFFFD3"
    },
    //Text Colours
    colorPrimary: {
        color: "#14E22A"
    },
    colorSecondary: {
        color: "#FFEE00"
    },
    colorWhite: {
        color: "#ffffff"
    },
    colorGray44: {
        color: "#707070"
    },
    colorBlueLgt: {
        color: "#30C5E1"
    },
    colorBlack: {
        color: "#000"
    },
    colorDanger: {
        color: "#FF0000"
    },
    colorComplete: {
        color: "#2E7400"
    },
    //Flex
    flex1: {
        flex: 1
    },
    flex3: {
        flex: 3
    },
    selfCenter: {
        alignSelf: "center"
    },
    selfRight: {
        alignSelf: "flex-end"
    },
    flexGrow: {
        flexGrow: 1
    },
    flexWrap: {
        flexWrap: "wrap"
    },
    rowReverse: {
        flexDirection: "row-reverse"
    },
    justifyItemsCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        // textAlign: "center"
    },
    flexRow: {
        flex: 1,
        flexDirection: "row"
    },
    flexColumn: {
        flexDirection: "column"
    },
    flexCenter: {
        alignItems: "center",
        justifyContent: "center"
    },
    verticalCenter: {
        alignItems: "center",
    },
    flexAlignRight: {
        alignItems: "flex-end"
    },
    flexAlignLeft: {
        alignItems: "flex-start"
    },
    verticalSelfCenter: {
        alignSelf: "center"
    },
    horizontalCenter: {
        justifyContent: "center"
    },
    horizontalRight: {
        justifyContent: "flex-end"
    },
    selfVerticalCenter: {},
    //Padding and Margins
    paddingYDefault: {
        paddingTop: 7,
        paddingBottom: 7
    },
    marginDefault: {
        marginTop: 7,
        marginBottom: 7,
    },
    ml_10: {
        marginLeft: 10
    },
    ml_20: {
        marginLeft: 20
    },
    mt_10: {
        marginTop: 10
    },
    my_5: {
        marginTop: 5,
        marginBottom: 5
    },
    my_7: {
        marginTop: 7,
        marginBottom: 7
    },
    my_10: {
        marginTop: 10,
        marginBottom: 10
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
    margin_3: {
        marginTop: 2,
        marginBottom: 2
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
    p_5: {
        padding: 5
    },
    p_10: {
        padding: 10
    },
    p_15: {
        padding: 15
    },
    p_20:{
        padding:20
    },
    p_30:{
        padding:30
    },
    pl_20: {
        paddingLeft: 20
    },
    pt_5: {
        paddingTop: 5,
    },
    pt_15: {
        paddingTop: 15
    },
    pb_5: {
        paddingBottom: 5
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
    pr_15: {
        paddingRight: 15
    },
    px_10: {
        paddingLeft: 10,
        paddingRight: 10
    },
    py_5: {
        paddingTop: 5,
        paddingBottom: 5
    },
    py_10: {
        paddingTop: 10,
        paddingBottom: 10
    },
    py_15: {
        paddingTop: 15,
        paddingBottom: 15
    },
    py_20: {
        paddingTop: 20,
        paddingBottom: 20
    },
    w_100: {
        width: "100%"
    },
    w_10: {
        width: "10%"
    },
    w_25: {
        width: "20%"
    },
    w_35: {
        width: "35%"
    },
    w_45: {
        width: "45%"
    },
    w_50: {
        width: "50%"
    },
    w_65: {
        width: "65%"
    },
    w_75: {
        width: "75%",
    },
    w_90: {
        width: "90%"
    },
    absoluteCenter: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    customPadding: {
        paddingTop: 5,
        paddingBottom: 5
    },
    ft_small: {
        fontSize: PixelRatio.get() < 2 ? 10 : 13
    },
    ft_20: {
        fontSize: 20
    },
    capitalCase: {
        textTransform: "capitalize"
    },
    upperCase: {
        textTransform: "uppercase"
    },
    //Borders
    border2: {
        borderWidth: 2
    },
    borderX2: {
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    borderBottom2: {
        borderBottomWidth: 2
    },
    borderBottom: {
        borderBottomWidth: 1
    },
    borderBlack: {
        borderColor: "#000000"
    },
    borderGray44: {
        borderColor: "#707070"
    },
    borderTransparent: {
        borderColor: 'transparent'
    },

    borderRadiusDefault: {
        borderRadius: 4
    },
    //Button Styles
    btnGray: {
        backgroundColor: "#2E2E2E",
        marginBottom: 7
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 4,
    },
    buttonPrimary: {
        backgroundColor: "#14E22A",
        color: "#2E2E2E"
    },
    buttonSecondary: {
        backgroundColor: "#2E2E2E",
        borderWidth: 2,
        borderColor: "#14E22A"
    },
    buttonBlack: {
        color: "#000"
    },
    buttonHomeTxt: {
        // color: "#14E22A",
        textTransform: "uppercase",
    },
    buttonHomeIcon: {
        fontSize: (isHDPI || isMDPI) ? 25 : 30
    },
    btnPadding: {
        marginTop: 15,
        marginBottom: 15,
        paddingTop: 20,
        paddingBottom: 20
    },
    btnTxt: {
        color: "#000",
        fontSize: 15,
        fontFamily: "Hancock"
    },
    btnInverseColor: {
        color: "#fff"
    },
    btnLargeTxt: {
        color: "#14E22A",
        fontSize: 20,
        fontFamily: "Hancock"
    },

    //App Styles
    imageBg: {
        width,
        height
    },
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    content: {},
    contentCenter: {
        alignItems: "center",
    },
    appHeader: {
        width: 125,
        height: isXXHDPI ? 50 : 60,
        resizeMode: 'contain',
    },
    headerHeight: {
        height: isXXHDPI ? 100 : 80
    },
    subHeaderBg: {
        height: 80,
        position: "relative",
        marginBottom: 25
    },
    customMargin: {
        marginTop: 30,
        marginBottom: 30
    },
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
    subHeaderTxtCol: {
        // width: "85%",
    },
    subHeaderTxt: {
        fontSize: PixelRatio.get() < 2 ? 13 : 17,
        textTransform: "uppercase"
    },
    marginAppDefault: {
        // marginLeft:20,
        // marginRight:20
    },
    paddingAppDefault: {
        // paddingLeft:10,
        // paddingRight:10
    },
    inputForm: {},
    subHeader: {
        position: "relative",
        paddingTop: 25,
        paddingBottom: 25,
        alignItems: "center",
        backgroundColor: 'transparent',
    },
    headerIcon: {
        fontSize: 40,
    },
    loginForm: {
        // marginTop:5,
    },
    loginInput: {
        backgroundColor: "#fff",
        marginTop: 7,
        marginBottom: 7,
        borderRadius: 4,
        marginLeft: 0,
        marginRight: 0,
        borderColor: "#14E22A",
        borderWidth: 1,
        width: "100%"
    },
    loginInputBox: {
        fontSize: 14,
    },
    txtCenter: {
        textAlign: "center",
    },
    appMargin: {
        marginLeft: PixelRatio.get() <= 2 ? 10 : 20,
        marginRight: PixelRatio.get() <= 2 ? 10 : 20
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        // borderColor: "#14E22A",
        borderWidth: 2
    },
    modalBg: {
        backgroundColor: 'rgba(000,000,000,0.7)'
    },
    modalView: {
        width: "75%"
    },
    orderBorder: {},
    Mh80xl: {
        minHeight: PixelRatio.get() > 2 ? 80 : "auto"
    },
    iconCol: {
        width: "15%",
        paddingLeft: 10
    }
});
