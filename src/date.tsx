import * as React from 'react';
import 'react-datetime/css/react-datetime.css';
import * as moment from 'moment';
import {IHTMLEvent} from './utility';
import {IBaseInputProps, BaseInput, IBaseInputState} from './base-input';

export type ParseableDate = Date|moment.Moment|string;

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

export class DateTimeInput extends BaseInput<IDateTimeInputProps, IBaseInputState> {

  protected readonly type = 'date';

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
      dateFormat,
      ...rest
    } = this.props;

    return (
      <div className={this.resolveContainerClassName()}>
        <ReactDateTimeInput
          {...(rest) as any}
          inputProps={{readOnly: true, autoFocus: this.props.autoFocus}}
          input={true}
          value={moment(this.state.value)}
          className={this.resolveContainerClassName}
          onChange={this._onChange}
          onBlur={this._onBlur}
        />
      </div>
    );
  }

  private convertToHTMLEvent(date: ParseableDate) {

    let value: string = null;
    if (date === undefined || date === null) {
      value = null;
    }
    else if (typeof date === 'string') {
      value = date;
    }
    else if (date instanceof Date) {
      value = date.toISOString();
    }
    else {
      const m = moment(date);
      if (m.isValid()) {
        value = m.toDate().toISOString();
      }
      else {
        value = null;
      }
    }

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

  private _onBlur(date: ParseableDate) {
    const event = this.convertToHTMLEvent(date);
    this.onBlur(event);
  }

  private _onChange(date: ParseableDate) {
    const event = this.convertToHTMLEvent(date);
    this.onChange(event);
  }

}
