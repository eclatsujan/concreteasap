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
        fontSize: (isMDPI) ? 13 : 14
    },
    baseSmallFontSize: {
        fontSize: (isMDPI || isHDPI) ? 10 : 13
    },
    baseLargeFontSize: {
        fontSize: 18
    },
    baseExtraLargeFontSize: {
        fontSize: 25
    },
    baseFont: {
        fontFamily: "Arial"
    },
    customFont: {
        fontFamily: "Hancock"
    },
    defaultFont: {
        fontFamily: "Roboto"
    },
    arialFont: {
        fontFamily: "Arial"
    },
    boldFont: {
        fontWeight: "bold"
    },
    defaultCircle: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    defaultPadding: {
        paddingTop: 12,
        paddingBottom: 12
    },
    defaultMargin: {
        marginTop: 20,
        marginBottom: 20
    },
    bottomMarginDefault: {
        marginBottom: 20
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
    bgSuccess: {
        backgroundColor: "#14E22A"
    },
    bgDanger: {
        backgroundColor: "#DB0000"
    },
    bgError: {
        backgroundColor: "#B00020"
    },
    bgNotification: {
        backgroundColor: "#CFFFD3"
    },
    //Text Colours
    colorSuccess: {
        color: "#14E22A"
    },
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
        color: "#DB0000"

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
    justifySpace: {
        justifyContent: "space-between"
    },
    justifyRight: {
        justifyContent: 'flex-end'
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
    verticalLeftSelf: {
        alignSelf: "flex-start"
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
        paddingTop: 12,
        paddingBottom: 12
    },
    marginDefault: {
        marginTop: 7,
        marginBottom: 7,
    },
    m_10: {
        margin: 10
    },
    ml_10: {
        marginLeft: 10
    },
    ml_20: {
        marginLeft: 20
    },
    mt_5: {
        marginTop: 5
    },
    mt_10: {
        marginTop: 10
    },
    mt_15: {
        marginTop: 15
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
    mb_5: {
        marginBottom: 5
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

    mx_5: {
        marginLeft: 5,
        marginRight: 5
    },
    mx_10: {
        marginLeft: 20,
        marginRight: 20
    },
    mx7: {
        marginTop: 7,
        marginBottom: 7
    },
    paddingXDefault: {
        paddingTop: 12,
        paddingBottom: 12
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
    p_20: {
        padding: 20
    },
    p_30: {
        padding: 30
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
    pr_20: {
        paddingRight: 20
    },
    px_5: {
        paddingLeft: 5,
        paddingRight: 5
    },
    px_10: {
        paddingLeft: 10,
        paddingRight: 10
    },
    px_20: {
        paddingLeft: 20,
        paddingRight: 20
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
    w_20: {
        width: "20%"
    },
    w_25: {
        width: "20%"
    },
    w_35: {
        width: "35%"
    },
    w_40: {
        width: "40%"
    },
    w_45: {
        width: "45%"
    },
    w_50: {
        width: "50%"
    },
    w_60: {
        width: "60%"
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
    h_100:{
        height:"100%"
    },
    //input
    inputGray: {
        color: "#575757"
    },
    //center
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
    ft_15:{
        fontSize:15
    },
    txtLeft: {
        textAlign: "left"
    },
    txtCenter: {
        textAlign: "center",
    },
    capitalCase: {
        textTransform: "capitalize"
    },
    upperCase: {
        textTransform: "uppercase"
    },
    //Borders
    noBorder:{
        borderRadius:0
    },
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
        borderColor: "#DFDFDF"
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
    subHeaderBg: {
        // height: 80,
        // position: "relative",
        // marginBottom: 20
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
        paddingLeft: 10,
        paddingRight: 10
    },
    inputForm: {},
    subHeader: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
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
    appMargin: {
        marginLeft: PixelRatio.get() <= 2 ? 20 : 30,
        marginRight: PixelRatio.get() <= 2 ? 20 : 30
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        // borderColor: "#14E22A",
        borderWidth: 2
    },
    smallCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        borderWidth: 2
    },
    smallCircleNoBorder: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
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
    },
    navBar: {
        height: isXXHDPI ? 100 : 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rightIcon: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
    },
    customCard: {
        padding: 15
    },
    tp_header: {
        height: 45,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    tp_buttonAction: {
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    tp_buttonText: {
        fontSize: 20,
        color: "#006BFF",
        fontWeight: "500"
    },
    tp_buttonTextCancel: {
        color: "#666",
        fontWeight: "400"
    },
    tp_body: {
        flexDirection: "row"
    },
    tp_picker: {
        flex: 1
    },
    tp_separator: {
        alignSelf: "center",
        fontSize: 16
    }
});
