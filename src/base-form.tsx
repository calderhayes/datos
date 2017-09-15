import * as React from 'react';
import {IHTMLEvent, noop, IFieldMessage} from 'utility';

export interface IErrorMessageMap {
  [name: string]: IFieldMessage;
}

export interface IBaseFormProps<T extends object> {
  formData: T;
  onBlur?: (formData: T) => void;
  onSubmit?: (formData: T) => void;
  validator?: (formData: T) => IErrorMessageMap;
  isLoading: boolean;
  formErrorMessages?: Array<string>;
  lastTimeFieldUpdated: number;
  fieldErrorMessageMap: IErrorMessageMap;
}

export interface IBaseFormState {
  errorMessages: IErrorMessageMap;
}

export abstract class BaseForm
<T extends object, P extends IBaseFormProps<T>, S extends IBaseFormState>
extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      errorMessages: {}
    } as S;
  }

  public componentWillReceiveProps(nextProps: P) {
    if (nextProps.lastTimeFieldUpdated !== this.props.lastTimeFieldUpdated) {
      this.validate(this.props.formData as T);
    }
  }

  protected get canSubmit() {
    const keys = Object.keys(this.state.errorMessages);
    for (const key in keys) {
      if (this.state.errorMessages.hasOwnProperty(key)) {
        continue;
      }
      const val = this.state.errorMessages[key];
      if (val && val.preventSubmitError) {
        return false;
      }
    }

    return true;
  }

  protected onBlur(event: IHTMLEvent) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const data = {
      ...(this.props.formData as any)
    };

    data[name] = value;

    this.validate(data);
    (this.props.onBlur || noop)(data);
  }

  protected validate(data: T) {
    const errorMessageMap = this.props.validator(data);
    const map: IErrorMessageMap = Object.assign(
      {},
      this.props.fieldErrorMessageMap,
      errorMessageMap);
    this.setState({
      errorMessages: map
    });
  }

}
