import * as React from 'react';
import * as cx from 'classnames';
import {BaseInput, IBaseInputProps, IBaseInputState} from 'base-input';

export interface IInputProps extends IBaseInputProps {
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
      fieldMessage,
      ...rest
    } = this.props;

    const containerClass = cx({
      [containerClassName]: !!containerClassName,
      [errorContainerClassName]: !!fieldMessage && !!errorContainerClassName
    });

    const _className = cx({
      [className]: !!className,
      [errorClassName]: !!fieldMessage && !!errorClassName
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

