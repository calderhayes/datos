import * as React from 'react';
import * as cx from 'classnames';
import {IErrorable} from 'utility';
import {BaseInput, IBaseInputProps, IBaseInputState} from 'base-input';

export interface IInputProps extends IBaseInputProps, IErrorable {
  placeholder?: string;
}

export class Input extends BaseInput<IInputProps, IBaseInputState> {

  private isCheckbox: boolean;
  private defaultValue: string;

  constructor(props: IInputProps) {
    super(props);
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

    // TODO: may have dedicated checkbox
    const checked = this.isCheckbox ? this.defaultValue : '';

    return (
      <div className={containerClass}>
        <input
          {...(rest) as any}
          className={_className}
          defaultValue={this.defaultValue}
          value={this.state.value}
          checked={checked}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

