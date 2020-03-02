import {Field, reduxForm} from "redux-form/lib/immutable";
import {Button, Text, View} from "native-base";
import * as React from "react";
import {appStyles} from "../../../../../assets/styles/app_styles";
import csPicker from "../../../Basic/Forms/csPicker";
import {formValidation} from "../../../../helpers/validation";
import {renderList} from "../../../../helpers/app";
import {ReoFormValues} from "../../../../formValues/REO";
import FieldHeader from "../../../Basic/Forms/FieldHeader";


class AccessoriesReoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            "accessories":""
        };
        super(props);
        this.onAccessoriesHandler=this.onAccessoriesHandler.bind(this);
    }

    onAccessoriesHandler(val) {
        this.setState({accessories:val});
    }

    displaySubAccessoriesCategory(category_name){
        let icon_list={
            "Abelflex Plain":"plain",
            "Abelflex Adhesive":"adhesive",
            "Stiff Mastic Joints":"stiff"
        };

        let list=category_name!=="Stiff Mastic Joints"?ReoFormValues.abelflex_plain:ReoFormValues.stiff_mastic_joints;

        return category_name!==""?(
            <View style={appStyles.my_5}>
                <FieldHeader title={category_name} icon={icon_list[category_name]} />
                <Field name="accessories_type" iosHeader="Type" component={csPicker}>
                    {renderList(list)}
                </Field>
            </View>
        ):null;
    }


    render() {
        const {handleSubmit} = this.props;

        return (
            <View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Accessories"} />
                    <Field name="accessories" iosHeader="Type" component={csPicker}
                           onSelectValue={this.onAccessoriesHandler}>
                        {renderList(ReoFormValues.accessories)}
                    </Field>
                </View>
                {this.displaySubAccessoriesCategory(this.state.accessories)}
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Expansion Joints"} icon={"expansion"} />
                    <Field name="expansion_joints" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.expansion_joints)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Bar Chairs"} icon={"plastic"} />
                    <Field name="bar_chairs" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.bar_chairs)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Plastic Membrane and Tape"} icon={"membrane"} iconSize={30} />

                    <Field name="plastic_membrance" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.plastic_membrane)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Wire"} icon={"reinforcement"} iconSize={25} />
                    <Field name="wire" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.wire)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Button style={[appStyles.button, appStyles.bgBluelgt, appStyles.horizontalCenter]}
                            onPress={handleSubmit(this.props.onSubmit)}>
                        <Text style={appStyles.buttonBlack}>Next</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

let accessoriesOrderForm = reduxForm({
    form: "placeReoOrder",
    destroyOnUnmount: false,        // <------ preserve formValues data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    // enableReinitialize:true
    // validate: formValidation.addressValidation
})(AccessoriesReoForm);

export default accessoriesOrderForm;