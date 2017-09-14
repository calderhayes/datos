import * as React from 'react';
import * as cx from 'classnames';
import {noop} from 'utility';

export interface IHTMLInputProps {
  onChange?: Function;
  onBlur?: Function;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
}

export interface IInputProps extends IHTMLInputProps {
  errorMessage?: string;
  errorClassName?: string;
  containerClassName?: string;
  errorContainerClassName?: string;
}

export class Input extends React.Component<IInputProps, {}> {

  private isCheckbox: boolean;
  private value: string;

  constructor(props: IInputProps) {
    super(props);

    this.isCheckbox = props.type === 'checkbox' || props.type === 'radio';
    this.value = this.props.value;
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

    const value = this.props.value || '';

    const checked = this.isCheckbox ? value : '';

    return (
      <div className={containerClass}>
        <input
          {...(rest) as any}
          className={_className}
          value={value}
          checked={checked}
          onChange={this.props.onChange || noop}
          onBlur={this.props.onBlur || noop}
        />
      </div>
    );
  }
}

