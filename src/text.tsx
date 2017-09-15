import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from 'base-input';

export interface IInputProps extends IBaseInputProps {
  placeholder?: string;
}

export class TextInput extends BaseInput<IInputProps, IBaseInputState> {

  protected type: string = 'text';

  constructor(props: IInputProps) {
    super(props);
  }

  public render() {
    const {
      errorClassName,
      containerClassName,
      errorContainerClassName,
      className,
      fieldMessage,
      ...rest
    } = this.props;

    return (
      <div className={this.resolveContainerClassName()}>
        <input
          {...(rest) as any}
          type='text'
          className={this.resolveClassName()}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

