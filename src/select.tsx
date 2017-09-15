import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from 'base-input';

export class SelectInput extends BaseInput<IBaseInputProps, IBaseInputState> {

  protected type = 'select';

  public render() {
    return (
      <div>
        <option value='value1'>Value 1</option> 
        <option value='value2' selected>Value 2</option>
        <option value='value3'>Value 3</option>
      </div>
    );
  }
}
