import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from './base-input';
import {IHTMLEvent} from './utility';

export interface IDecimalInputProps extends IBaseInputProps {
  decimalValue: number;
  decimalSpaces?: number;
}

export interface IDecimalHTMLEvent extends IHTMLEvent {
  target: {
    type: string;
    name: string;
    checked?: boolean;
    value?: string;
    decimalSpaces: number;
  };
}

export class DecimalInput extends BaseInput<IDecimalInputProps, IBaseInputState> {

  protected readonly type = 'decimal';

  protected readonly defaultDecimalSpaces = 2;

  constructor(props: IDecimalInputProps) {
    super(props);

    this.state = {
      value: props.decimalValue.toString(),
      isUsed: false,
      isChanged: false
    };

    this.render = this.render.bind(this)
  }

  protected onChange(event: IDecimalHTMLEvent) {
    event.target.decimalSpaces = this.props.decimalSpaces || this.defaultDecimalSpaces;
    super.onChange(event);
  }

  protected onBlur(event: IDecimalHTMLEvent) {
    event.target.decimalSpaces = this.props.decimalSpaces || this.defaultDecimalSpaces;
    super.onBlur(event);
  }

  public render() {
    const {
      errorClassName,
      containerClassName,
      errorContainerClassName,
      className,
      fieldMessage,
      decimalValue,
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
