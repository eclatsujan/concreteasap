import React from "react";
import {Alert} from 'react-native';
import moment from "moment";
import {Calendar} from "react-native-calendars";
import {TouchableWithoutFeedback, View, Platform} from "react-native";
import Modal from "react-native-modal";
import {appStyles} from "../../../../assets/styles/app_styles";
import CustomButton from "../Button/CustomButton";
import {fromJS} from "immutable";
import * as Immutable from 'immutable';

export default class CalendarModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customMarkDate:[],
            markedDates: this.props.defaultDates,
            date_length:0
        };
        this.selected = {
            selected: true,
            marked: true,
            // selectedColor: '#14E22A',
            customStyles: {
                container: {
                    backgroundColor: '#14E22A'
                },
                text: {
                    color: 'black',
                    fontWeight: 'bold'
                },
            },
            dots:[]
        };
        this.addMarkDate = this.addMarkDate.bind(this);
        // this.updateSameDate=this.updateSameDate.bind(this);
    }

    addMarkDate(day) {
        let customDates=[...this.state.customMarkDate];

        if(customDates.length<3){
            customDates.push(day);
        }
        else{
            let arr_index=0;
            if(customDates[customDates.length-1]["day"]>day["day"]){
                arr_index=customDates.length-1;
            }
            if(customDates[0]["dateString"]===day["dateString"]){
                arr_index=2;
            }
            customDates.splice(arr_index,1);
            customDates.push(day);
        }
        let dateRecord=new Immutable.Map({});
        // console.log(dateRecord.has("abc"));
        customDates.forEach((val,index)=>{
            let dateKey=val["dateString"];
            // console.log(dateRecord.has(dateKey))
            if(!dateRecord.has(dateKey)){
                dateRecord=dateRecord.set(dateKey,fromJS(this.selected))
            }
            else{
                let dot={key:index, color: 'red', selectedDotColor: 'blue'};
                dateRecord=dateRecord.updateIn([dateKey,"dots"],(dots)=>{
                    return dots.push(dot);
                });
            }

        });
        this.setState({markedDates:dateRecord.toJS()});
        this.setState({customMarkDate:customDates});

        this.props["onSave"](customDates, false);
    }

    render() {
        let length = Object.keys(this.state.markedDates).length;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                isVisible={this.props["modalVisibility"]}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                }}
                coverScreen={true}
                onBackdropPress={() => {
                    // this.props["onClose"](this.state.customMarkDate);
                }}>
                <Calendar
                    theme={{
                        'stylesheet.calendar.header': {
                            header: {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 6,
                                alignItems: 'center',
                                backgroundColor: '#14E22A',
                            },
                            monthText: {
                                fontWeight: 'bold',
                            },
                            arrowImage: {
                                ...Platform.select({
                                    ios: {
                                        tintColor: "#000"
                                    },
                                    android: {
                                        tintColor: "#000"
                                    }
                                })
                            },
                        }
                    }}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={moment().toDate()}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {
                        this.addMarkDate(day);
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {
                        // console.log(day);
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {

                    }}
                    // Hide month navigation arrows. Default = false

                    // Replace default arrows with custom ones (direction can be 'left' or 'right')

                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    // disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={true}
                    //marked Dates
                    markedDates={this.state.markedDates}

                    markingType={'multi-dot'}
                />
                <View style={[appStyles.mt_5]}>
                    <CustomButton btnText={"Select Date"} onPress={() => {
                        this.props.onClose(this.state.customMarkDate, false);
                    }}/>
                </View>
            </Modal>
        );
    }
}