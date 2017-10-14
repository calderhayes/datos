import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from './base-input';
import {IHTMLEvent} from './utility';

export interface ISelectInputOption {
  value: string;
  label: string;
}

export interface ISelectInputProps extends IBaseInputProps {
  options: Array<ISelectInputOption>;
  canHaveUnselected?: boolean;
  unselectedText?: string;
}

export class SelectInput extends BaseInput<ISelectInputProps, IBaseInputState> {

  protected type = 'select';

  constructor(props: ISelectInputProps) {
    super(props);

    this.state = {
      value: this.props.value || ''
    } as IBaseInputState;

    this._onChange = this._onChange.bind(this);
  }

  public render() {

    const {
      onBlur,
      options,
      errorContainerClassName,
      canHaveUnselected,
      fieldMessage,
      unselectedText,
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
          {this.mapOptionsToElements(options)}
        </select>
      </div>
    );
  }

  private mapOptionsToElements(options: Array<ISelectInputOption>) {
    const opts = options.slice(0);
    if (this.props.canHaveUnselected) {
      opts.unshift({ value: '', label: this.props.unselectedText || ''});
    }

    return opts.map((o, i) => {
      return <option key={i.toString()} value={o.value}>{o.label}</option>;
    });
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
