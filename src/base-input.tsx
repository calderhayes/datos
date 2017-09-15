import * as React from 'react';
import {IHTMLEvent, noop} from 'utility';

export interface IBaseInputProps {
  value: string;
  name: string;
  type: string;
  disabled?: boolean;
  className?: string;
  onChange?: (event: IHTMLEvent) => void;
  onBlur?: (event: IHTMLEvent) => void;
}

export interface IBaseInputState {
  value: string;
  isChanged: boolean;
  isUsed: boolean;
  isChecked: boolean;
}

export class BaseInput<T extends IBaseInputProps, S extends IBaseInputState> extends React.Component<T, S> {

  constructor(props: T) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      value: this.props.value,
      isUsed: false,
      isChecked: false,
      isChanged: false
    } as S;
  }

  public componentWillReceiveProps(nextProps: IBaseInputProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
        isChanged: true
      });
    }
  }

  protected onChange(event: IHTMLEvent) {
    const isCheckbox = this.props.type === 'checkbox' || this.props.type === 'radio';
    const isChecked = isCheckbox ? !this.state.isChecked : true;
    const checkboxValue = isChecked ? event.target.value : '';
    const value = isCheckbox ? checkboxValue : event.target.value;

    event.persist();

    this.setState({
      value,
      isChanged: true,
      isChecked
    },
    () => {
      const func = this.props.onChange || noop;
      func(event);
    });
  }

  protected onBlur(event: IHTMLEvent) {
    event.persist();

    this.setState({
      isUsed: true
    },
    () => {
      const func = this.props.onBlur || noop;
      func(event);
    });
  }

}