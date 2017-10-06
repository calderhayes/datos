import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from './base-input';
import {IHTMLEvent, noop} from './utility';

export interface INumberProps extends IBaseInputProps {
  placeholder?: string;
  numberValue: number;
}

export class NumberInput extends BaseInput<INumberProps, IBaseInputState> {

  protected readonly type = 'number';

  constructor(props: INumberProps) {
    super(props);

    this.state = {
      value: props.numberValue.toString(),
      isChanged: false,
      isUsed: false
    };
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
          type='text'
          className={this.resolveClassName()}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </div>
    );
  }

  protected onChange(event: IHTMLEvent) {
    const value = event.target.value;

    event.persist();

    const e: IHTMLEvent = {
      target: {
        type: 'number',
        name: this.props.name,
        checked: null,
        value
      },
      persist: () => {
        // do nothing?
      }
    };

    this.setState({
      value,
      isChanged: true
    },
    () => {
      const func = this.props.onChange || noop;
      func(e);
    });
  }

  protected onBlur(event: IHTMLEvent) {
    event.persist();

    const e: IHTMLEvent = {
      target: {
        type: 'number',
        name: this.props.name,
        checked: null,
        value: event.target.value
      },
      persist: () => {
        // do nothing?
      }
    };

    this.setState({
      isUsed: true
    },
    () => {
      const func = this.props.onBlur || noop;
      func(e);
    });
  }
}
