import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from './base-input';

export interface IPasswordProps extends IBaseInputProps {
  placeholder?: string;
}

export class PasswordInput extends BaseInput<IPasswordProps, IBaseInputState> {

  protected type = 'password';

  constructor(props: IPasswordProps) {
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
          type={this.type}
          className={this.resolveClassName()}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

