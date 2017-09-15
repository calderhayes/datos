import * as React from 'react';
import 'react-datetime/css/react-datetime.css';
import {Moment} from 'moment';
import {noop, IHTMLEvent} from 'utility';
import {IBaseInputProps} from 'base-input';
import * as cx from 'classnames';

export type ParseableDate = Date|Moment|string;

export enum DateInputViewMode {
  YEARS = 'years',
  MONTHS = 'months',
  DAYS = 'days',
  TIME = 'time'
}

export interface IReactDateTimeInputProps {
  dateFormat?: boolean|string;
  timeFormat?: boolean|string;
  input?: boolean;
  open?: boolean|null;
  locale?: string|null;
  utc?: boolean;
  // onChange?: (date: Moment|string) => void;
  onFocus?: Function;
  // onBlur?: (date: Moment|string) => void;
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

export interface IDateTimeInputProps extends IReactDateTimeInputProps, IBaseInputProps {

}

// https://github.com/YouCanBookMe/react-datetime
// tslint:disable-next-line:no-var-requires no-require-imports
const ReactDateTimeInput: any = require('react-datetime');

export class DateTimeInput extends React.Component<IDateTimeInputProps, {}> {

  constructor(props: IDateTimeInputProps) {
    super(props);

    this._onBlur = this._onBlur.bind(this);
    this._onChange = this._onChange.bind(this);
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
        <ReactDateTimeInput
          {...(rest) as any}
          className={_className}
          onChange={this._onChange || noop}
          onBlur={this._onBlur}
        />
      </div>
    );
  }

  private convertToHTMLEvent(date: Moment) {
    const value = (!!date && date.isValid) ? date.toDate().toISOString() : null;

    const event: IHTMLEvent = {
      target: {
        type: 'date',
        name: this.props.name,
        checked: null,
        value
      },
      persist: () => {
        // do nothing?
      }
    };

    return event;
  }

  private _onBlur(date: Moment) {
    (this.props.onBlur || noop)(this.convertToHTMLEvent(date));
  }

  private _onChange(date: Moment) {
    (this.props.onChange || noop)(this.convertToHTMLEvent(date));
  }

}
