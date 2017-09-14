import * as React from 'react';
import * as ReactSelect from 'react-select';
import {noop, IErrorable} from 'utility';
import * as cx from 'classnames';

// https://github.com/JedWatson/react-select
// tslint:disable-next-line:no-var-requires no-require-imports
const ReactSelectComponent = require('react-select');

// Sublime is giving me some errors, but compiles fine
export interface ISelectProps<TValue>
  extends ReactSelect.ReactSelectProps<TValue>, IErrorable {
  className?: string;
}

export class Select<TValue>
  extends React.Component<ISelectProps<TValue>, {}> {

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
        <ReactSelectComponent
          {...(rest) as any}
          className={_className}
          onChange={this.props.onChange || noop}
          onBlur={this.props.onBlur || noop} />
      </div>
    );
  }
}
