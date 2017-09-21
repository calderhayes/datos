import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from './base-input';

export interface ICheckboxInputProps extends IBaseInputProps {
  checked: boolean;
}

export class CheckboxInput extends BaseInput<ICheckboxInputProps, IBaseInputState> {

  protected readonly type = 'checkbox';

  public render() {
    const {
      errorClassName,
      containerClassName,
      errorContainerClassName,
      className,
      fieldMessage,
      ...rest
    } = this.props;

    const checked = this.props.checked ? 'checked' : '';

    return (
      <div className={this.resolveContainerClassName()}>
        <input
          {...(rest) as any}
          type={this.type}
          className={this.resolveClassName()}
          checked={checked}
          onClick={this.onChange}
        />
      </div>
    );
  }
}
