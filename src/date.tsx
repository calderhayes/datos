import * as React from 'react';
import 'react-datetime/css/react-datetime.css';
import {Moment} from 'moment';
import {noop, IErrorable} from 'utility';
import * as cx from 'classnames';

export type ParseableDate = Date|Moment|string;

export enum DateInputViewMode {
  YEARS = 'years',
  MONTHS = 'months',
  DAYS = 'days',
  TIME = 'time'
}

export interface IReactDateTimeInputProps {
  value?: ParseableDate;
  defaultValue?: ParseableDate;
  dateFormat?: boolean|string;
  timeFormat?: boolean|string;
  input?: boolean;
  open?: boolean|null;
  locale?: string|null;
  utc?: boolean;
  onChange?: (date: Moment|string) => void;
  onFocus?: Function;
  onBlur?: (date: Moment|string) => void;
  onViewModeChange?: (viewMode: DateInputViewMode) => void;
  viewMode?: DateInputViewMode;
  className?: string;
  inputProps?: {
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
  };
  isValidDate?: () => boolean;
  // render methods
  strictParsing?: boolean;
  closeOnSelect?: boolean;
  closeOnTab?: boolean;
  // ex: { hours: { min: 9, max: 15, step: 2 }}
  timeConstraints?: object;
  disableOnClickOutside?: boolean;
}

export interface IDateTimeInputProps extends IReactDateTimeInputProps, IErrorable {

}

// https://github.com/YouCanBookMe/react-datetime
// tslint:disable-next-line:no-var-requires no-require-imports
const ReactDateTimeInput: any = require('react-datetime');

export class DateTimeInput extends React.Component<IDateTimeInputProps, {}> {

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
        <ReactDateTimeInput
          {...(rest) as any}
          className={_className}
          onChange={this.props.onChange || noop}
          onBlur={this.props.onBlur || noop}
        />
      </div>
    );
  }

}
