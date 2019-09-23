import validatejs from "validate.js";

import { validationDictionary } from "./Dictonary";

function onInputChange({ id, value, cb = () => {} }) { //set the state as the user type in
  //console.log({id,value},"onInputChange");
  const { inputs } = this.state;
  this.setState(
    {
      inputs: {
        ...inputs,
        [id]: getInputValidationState({
          input: inputs[id],
          value
        })
      }
    },
    cb
  );
}

function getInputValidationState({ input, value }) {
  //console.log("getInputValidationState");
  return {
    ...input,
    value,
    errorLabel: input.optional
      ? null
      : validateInput({ type: input.type, value })
      
  };
}

function validateInput({ type, value }) {
 // console.log("validateInput");
  const result = validatejs(
    {
      [type]: value
    },
    {
      [type]: validationDictionary[type]
    }
  );

  if (result) {
    return result[type][0];
  }

  return null;
}

function getFormValidation() {
  //console.log("getFormValidation");
  const { inputs } = this.state;

  const updatedInputs = {};

  for (const [key, input] of Object.entries(inputs)) {
    updatedInputs[key] = getInputValidationState({
      input,
      value: input.value
    });
  }

  this.setState({
    inputs: updatedInputs
  });
  //console.log("Checking the value",inputs);
}

export const validationService = {
  onInputChange,
  getInputValidationState,
  validateInput,
  getFormValidation,
};
