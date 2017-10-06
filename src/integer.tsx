import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from './base-input';

export interface IIntegerProps extends IBaseInputProps {
  placeholder?: string;
  min?: number;
  max?: number;
  numberValue: number;
}

export class IntegerInput extends BaseInput<IIntegerProps, IBaseInputState> {

  protected readonly ype = 'number';

  constructor(props: IIntegerProps) {
    super(props);

    this.state = {
      value: props.numberValue.toString(),
      isUsed: false,
      isChanged: false
    } as IBaseInputState;
  }

  public render() {
    const {
      errorClassName,
      containerClassName,
      errorContainerClassName,
      className,
      fieldMessage,
      numberValue,
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

