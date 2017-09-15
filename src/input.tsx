import * as React from 'react';
import * as cx from 'classnames';
import {IErrorable} from 'utility';
import {BaseInput, IBaseInputProps, IBaseInputState} from 'base-input';

export interface IInputProps extends IBaseInputProps, IErrorable {
  placeholder?: string;
}

export class Input extends BaseInput<IInputProps, IBaseInputState> {

  private defaultValue: string;

  constructor(props: IInputProps) {
    super(props);
    this.defaultValue = this.props.value;
  }

  public render() {
    const {
      errorClassName,
      containerClassName,
      errorContainerClassName,
      className,
      errorMessage,
      ...rest
    } = this.props;

    const containerClass = cx({
      [containerClassName]: !!containerClassName,
      [errorContainerClassName]: !!errorMessage && !!errorContainerClassName
    });

    const _className = cx({
      [className]: !!className,
      [errorClassName]: !!errorMessage && !!errorClassName
    });

    return (
      <div className={containerClass}>
        <input
          {...(rest) as any}
          className={_className}
          defaultValue={this.defaultValue}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

