import React from "react";
import {Alert} from 'react-native';
import moment from "moment";
import {Calendar} from "react-native-calendars";
import {TouchableWithoutFeedback, View, Platform} from "react-native";
import Modal from "react-native-modal";
import {appStyles} from "../../../assets/styles/app_styles";

export default class CalendarModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            markedDates: {}
        };
        this.selected={
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
        };
        this.addMarkDate = this.addMarkDate.bind(this);
    }

    componentDidMount() {
        let markedDates={};
        this.props["defaultDates"].forEach((date)=>{
            markedDates[date]=this.selected;
        });
        this.setState({markedDates});
    }

    addMarkDate(day) {
        let markedDates = {...this.state.markedDates};

        let keys = Object.keys(markedDates);

        if (keys.length < 3) {
            if(markedDates[day.dateString]){
                delete markedDates[day.dateString];
            }
            else{
                markedDates[day.dateString] = this.selected;
            }

        }else {
            markedDates[day.dateString] = this.selected;
            delete markedDates[keys[0]];
        }

        Object.keys(markedDates).sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a)-new Date(b);
        });
        // console.log(markedDates);
        this.setState({markedDates: markedDates});
        this.props["onSave"](markedDates);
    }

    render() {

        return (
            <Modal
                animationType="slide"
                transparent={true}
                isVisible={this.props["modalVisibility"]}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                }}
                coverScreen={true}
                onBackdropPress={()=>{
                    this.props["onClose"](this.state.markedDates);
                }}>
                <Calendar
                    theme={{
                        'stylesheet.calendar.header': {
                            header: {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 6,
                                alignItems: 'center',
                                backgroundColor:'#14E22A',
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
                        // console.log('selected day', day)
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {
                        // console.log('selected day', day)
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {
                        // console.log('month changed', month)
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

                    markingType={'custom'}
                />
            </Modal>
        );
    }
}