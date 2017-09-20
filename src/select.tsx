import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from './base-input';
import {IHTMLEvent} from './utility';

export interface ISelectInputOption {
  value: string;
  label: string;
}

export interface ISelectInputProps extends IBaseInputProps {
  defaultOptions: Array<ISelectInputOption>;
  canHaveUnselected?: boolean;
}

export interface ISelectInputState extends IBaseInputState {
  options: Array<ISelectInputOption>;
  value: string;
}

export class SelectInput extends BaseInput<ISelectInputProps, ISelectInputState> {

  protected type = 'select';

  constructor(props: ISelectInputProps) {
    super(props);

    const options = props.defaultOptions.slice(0);
    if (props.canHaveUnselected) {
      options.unshift({ value: '', label: ''});
    }

    this.state = {
      options,
      value: this.props.value || ''
    } as ISelectInputState;

    this._onChange = this._onChange.bind(this);
  }

  public render() {

    const options = this.state.options.map((o, i) => {
      return <option key={i.toString()} value={o.value}>{o.label}</option>;
    });

    const {
      onBlur,
      defaultOptions,
      errorContainerClassName,
      canHaveUnselected,
      fieldMessage,
      ...rest
    } = this.props;

    return (
      <div className={this.resolveContainerClassName()}>
        <select
          {...rest}
          name={this.props.name}
          className={this.resolveClassName()}
          onChange={this._onChange}
          value={this.state.value}>
          {options}
        </select>
      </div>
    );
  }

  private _onChange(e: IHTMLEvent) {
    const select = e.target as HTMLSelectElement;
    let value: string = null;
    if (select.selectedIndex !== -1) {
      value = select.options[select.selectedIndex].getAttribute('value');
    }

    this.setState({
      value
    });

    const newEvent: IHTMLEvent = {
      target: {
        type: this.type,
        name: this.props.name,
        value
      },
      persist: () => { /* do nothing */ }
    };

    this.onChange(newEvent);
  }
}
