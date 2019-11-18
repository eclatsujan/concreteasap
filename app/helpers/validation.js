const required=(value)=>{
    return value || typeof value === 'number' ? undefined : 'Please enter the value.';
};

const requiredSelect=(value)=>{
    return value ? undefined : 'Please select the value';
};


export const formValidation={
    required,
    requiredSelect
};