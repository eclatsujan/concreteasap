import * as React from "react";
import {Field, reduxForm} from "redux-form/lib/immutable";
import {Button, Text, View} from "native-base";
// import TimePicker from "react-native-24h-timepicker";
import TimePicker from "../../../Basic/Modal/TimePicker";
import {appStyles} from "../../../../../assets/styles/app_styles";
import {formValidation} from "../../../../helpers/validation";

import csPicker from "../../../Basic/Forms/csPicker";

import {renderList} from "../../../../helpers/app";

import {orderForm} from "../../../../formValues/Concrete";
import csDatePicker from "../../../Basic/Forms/csDatePicker";
import csTimePicker from "../../../Basic/Forms/csTimePicker";
import CalendarModal from "../../../Basic/Modal/CalendarModal";
import CustomButton from "../../../Basic/Button/CustomButton";


class AdditionalOrderForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: [],
            showCalendar: false
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
        };
        this.updateDate = this.updateDate.bind(this);
        this.updateDateStateOnClose = this.updateDateStateOnClose.bind(this);
        this.updateDateState = this.updateDateState.bind(this);
        this.showCalendarModal = this.showCalendarModal.bind(this);
    }

    openTimePicker(time_input) {
        this.TimePicker.open();
        this.currentTimeSelector = time_input;
    }

    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        let obj_name = this.currentTimeSelector;
        let time = hour + ":" + minute;
        this.props.change(obj_name, time);

        if (obj_name === "time1") {
            if (!this.props["selectedTime"]["time2"]) {
                this.props.change("time2", time);
            }

            if (!this.props["selectedTime"]["time3"]) {
                this.props.change("time3", time);
            }
        }

        this.TimePicker.close();
    }

    updateDate(index, date) {
        let selectedDate = [...this.state.selectedDate];
        if (selectedDate[index]) {
            selectedDate.splice(index, 0, date);
        } else {
            selectedDate[index] = date;
        }

        this.setState({selectedDate});
    }

    showCalendarModal() {
        this.setState({showCalendar: true});
    }

    updateDateStateOnClose(dates,same_date) {
        this.setState({showCalendar: false});
        this.updateDateState(dates,same_date);
    }

    updateDateState(dates,same_date) {
        dates.sort((a,b)=>{
            return new Date(a["dateString"])-new Date(b["dateString"]);
        }).forEach((date,i)=>{
            let index = i === 0 ? "" : i;
           this.props.change("delivery_date"+index,date["dateString"]);
        });
        // let keys = Object.keys(dates);
        // if(!same_date){
        //     keys = keys.sort((a, b) => new Date(a) - new Date(b));
        //     keys.forEach((key, index) => {
        //         let name_index = index !== 0 ? index : "";
        //         this.props.change("delivery_date" + name_index, key);
        //     });
        //     if (keys.length < 3) {
        //         for (let i = keys.length - 1; i < 3; i++) {
        //             let index = i === 0 ? "" : i;
        //             this.props.change("delivery_date" + index, keys[i]);
        //         }
        //     }
        // }
        // else{
        //     this.props.change("delivery_date1",keys[0]);
        //     this.props.change("delivery_date2",keys[0]);
        // }

    }

    formatDate(initialDates) {
        let markedDates = {};
        if (this.props["defaultDates"]) {
            this.props["defaultDates"].forEach((date) => {
                markedDates[date] = this.selected;
            });
        }
        return markedDates;
    }

    getMarkedDate(initialDates){

    }

    render() {
        const {handleSubmit, initialValues} = this.props;
        const {show, date, mode} = this.state;
        let dates = [];
        if (!initialValues?.get("delivery_date") && !initialValues?.get("delivery_date1") && !initialValues?.get("delivery_date2")) {
            dates = [];
        } else {
            dates = [initialValues?.get("delivery_date"),
                initialValues?.get("delivery_date1"), initialValues?.get("delivery_date2")];
        }
        let markedDates = this.formatDate(dates);
        return (
            <View>
                <View>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>
                        Please select 3 Date and Time slots for delivery.
                    </Text>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>Date Preference
                        A</Text>
                    <Field name="delivery_date" onToggle={this.showCalendarModal} component={csDatePicker}
                           placeholder={"Date Preference A"} validate={[formValidation.requiredSelect]} dateIndex={0}
                           updateDate={this.updateDate}/>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>Time Preference
                        A</Text>
                    <Field name="time1" placeholder="Time Preference A" component={csTimePicker}
                           validate={[formValidation.requiredSelect]}
                           onPress={() =>
                               this.openTimePicker("time1")
                           }/>
                </View>
                <View style={appStyles.my_5}>
                    <View style={[appStyles.borderBottom, appStyles.borderWhite]}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>Date Preference
                        B</Text>
                    <Field name="delivery_date1" onToggle={this.showCalendarModal} component={csDatePicker}
                           placeholder={"Date Preference B"} validate={[formValidation.requiredSelect]} dateIndex={1}
                           updateDate={this.updateDate}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>Time Preference
                        B</Text>
                    <Field name="time2" component={csTimePicker} validate={[formValidation.requiredSelect]}
                           placeholder="Time Preference B" onPress={() => this.openTimePicker("time2")}/>
                </View>

                <View style={appStyles.my_5}>
                    <View style={[appStyles.borderBottom, appStyles.borderWhite]}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>Date Preference
                        C</Text>
                    <Field name="delivery_date2" onToggle={this.showCalendarModal} component={csDatePicker}
                           placeholder={"Date Preference C"} validate={[formValidation.requiredSelect]} dateIndex={2}
                           updateDate={this.updateDate}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>Time Preference
                        C</Text>
                    <Field name="time3" component={csTimePicker} validate={[formValidation.requiredSelect]}
                           placeholder="Time Preference C" onPress={() => this.openTimePicker("time3")}/>
                </View>

                <View style={appStyles.my_5}>
                    <View style={[appStyles.borderBottom, appStyles.borderWhite]}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>Time Between
                        Deliveries</Text>
                    <Field name="time_difference_deliveries" component={csPicker}
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.time_difference_deliveries)}
                    </Field>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>Urgency</Text>
                    <Field name="urgency" component={csPicker} validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.urgency)}
                    </Field>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.colorPrimary]}>
                        Site Call/On Call
                    </Text>
                    <Field name="site_call" component={csPicker} validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.site_call)}
                    </Field>
                </View>

                <CalendarModal modalVisibility={this.state.showCalendar} onSave={this.updateDateState}
                               defaultDates={markedDates}
                               onClose={this.updateDateStateOnClose}/>

                <TimePicker onCancel={() => this.onCancel()}
                            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                            minuteInterval={5}
                            ref={ref => {
                                this.TimePicker = ref;
                            }}/>
                <View>
                    <CustomButton btnText={"Next"} onPress={handleSubmit(this.props.onSubmit)}/>
                </View>
            </View>
        );
    }
}

let additionalOrderForm = reduxForm({
    form: "placeOrder",
    destroyOnUnmount: false,        // <------ preserve formValues data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(AdditionalOrderForm);

export default additionalOrderForm;