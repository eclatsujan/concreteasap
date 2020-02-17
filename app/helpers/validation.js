const required=(value)=>{
    return value || typeof value === 'number' ? undefined : 'Please enter the value.';
};

const requiredSelect=(value)=>{
    return value ? undefined : 'Please select the value';
};

const addressValidation=(values)=>{
    const errors={};
    if((typeof values.get("state")==="undefined"||values.get("state")=== "")||(typeof values.get("suburb")==="undefined"||values.get("suburb") === "")){
        errors.address="Please enter the full address.";
    }
    return errors;
};

export const formValidation={
    required,
    requiredSelect,
    addressValidation
};