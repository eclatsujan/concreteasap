import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content, Button, Text, Textarea, View, Form} from 'native-base';

import {connect} from 'react-redux';
import {actions} from '../../../store';

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'

//StyleSheet
import {appStyles} from "../../assets/app_styles";


class ReviewInstructions extends React.Component {
    constructor(props) {
        super(props);
    }

    submitForm(full_order,order_id) {
        console.log(order_id);
        if(order_id){
            console.log(full_order);
        }
        else{

        }
        // if(order_id){
        //     full_order["order_id"]=order_id;
        //     this.props.modifyOrder(full_order);
        // }
        // else{
        //     this.props.createOrder(full_order);
        // }

    }

    render() {
        const {params} = this.props.navigation.state;
        const full_order = params ? params.full_order : null;
        let app = this.props.app.toJS();
        let order_id=this.props.navigation.getParam("order_id");
        return (
            <AppBackground loading={app.loading}>
                <ScrollView style={appStyles.pb_45}>
                    <AppHeader backMenu/>
                    <SubHeader iconName="search" title="Review Instructions"/>
                    <Content>
                        <Form>
                            <View style={appStyles.my_5}>
                                <Text style={[appStyles.baseFont, appStyles.colorPrimary]}>Special Instructions</Text>
                                <Textarea disabled={true} value={full_order["specialInstructions"]}
                                          style={[appStyles.bgWhite, appStyles.py_5, appStyles.my_5]}/>
                            </View>
                            <View style={appStyles.my_5}>
                                <Text style={[appStyles.baseFont, appStyles.colorPrimary]}>Delivery Instructions</Text>
                                <Textarea disabled={true} value={full_order["deliveryInstructions"]}
                                          style={[appStyles.bgWhite, appStyles.py_5, appStyles.my_5]}/>
                            </View>
                            <Button style={[appStyles.button, appStyles.bgPrimary, appStyles.horizontalCenter]}
                                    onPress={() => this.submitForm(full_order,order_id)}>
                                <Text style={appStyles.colorBlack}>NEXT</Text>
                            </Button>
                        </Form>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: (order) => {
            return dispatch(actions.order.createOrder(order))
        },
        modifyOrder:(order) => {
            return dispatch(actions.order.modifyOrder(order));
        }
    }
};

const mapStateToProps = (state) => {
    // const {order, app} = state;
    return {
        order: state.get("order"),
        app: state.get("app")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReviewInstructions);
