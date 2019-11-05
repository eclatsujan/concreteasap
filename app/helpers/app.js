import * as React from 'react';
import {Picker} from "native-base";
import {appStyles} from "../screens/assets/app_styles";

export function renderList(data) {
  let view = [];
  if (Array.isArray(data)) {
    data.forEach(function (element) {
      view.push(
          <Picker.Item style={[appStyles.baseFont]} label={element.label} value={element.key} key={element.key}/>
      );
    });
  }
  return view;
}

export function getNested(theObject, path, separator){
  try {
    separator = separator || '.';
    return path.replace('[', separator).replace(']', '').split(separator).reduce(
        function (obj, property) {
          return obj[property];
        }, theObject
    );

  } catch (err) {
    return undefined;
  }
}