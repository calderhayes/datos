import * as React from 'react';
import {IHTMLEvent, noop, IFieldMessage} from 'utility';

export interface IErrorMessageMap {
  [name: string]: IFieldMessage;
}

export interface IBaseFormProps<T extends object> {
  defaultFormData: T;
  onBlur?: (formData: T) => void;
  onSubmit?: (formData: T) => void;
  validator?: (formData: T) => IErrorMessageMap;
  isLoading: boolean;
  formErrorMessages?: Array<string>;
  lastTimeFieldUpdated: number;
  fieldErrorMessageMap: IErrorMessageMap;
}

export interface IBaseFormState<T extends object> {
  errorMessages: IErrorMessageMap;
  formData: T;
}

export abstract class BaseForm
<T extends object, P extends IBaseFormProps<T>, S extends IBaseFormState<T>>
extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.validate = this.validate.bind(this);
    this.defaultValidator = this.defaultValidator.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      errorMessages: {},
      formData: this.props.defaultFormData
    } as S;
  }

  public componentWillReceiveProps(nextProps: P) {
    if (nextProps.lastTimeFieldUpdated !== this.props.lastTimeFieldUpdated) {
      this.validate(this.state.formData as T);
    }
  }

  protected defaultValidator(_: T): IErrorMessageMap {
    return {};
  };

  protected get canSubmit() {
    console.warn(this.state.errorMessages);
    for (const prop in this.state.errorMessages) {
      if (!this.state.errorMessages.hasOwnProperty(prop)) {
        continue;
      }
      const val = this.state.errorMessages[prop];
      if (val && val.preventSubmitError) {
        return false;
      }
    }

    return true;
  }

  protected onBlur(event: IHTMLEvent) {
    console.warn('onblur baseform. orig:', this.state.formData);
    const value = this.getValueFromEvent(event);
    console.warn('newvalue', value);
    const name = event.target.name;
    console.warn('name', name);

    let data = {
      ...(this.state.formData as any)
    };

    data[name] = value;

    console.warn('onblur baseform newdata:', data);
    this.validate(data);
    this.setState({
      formData: data
    });
    (this.props.onBlur || noop)(data);
  }

  protected validate(data: T, callback?: () => void) {
    const validator = this.props.validator || this.defaultValidator;
    const errorMessageMap = validator(data);
    const map: IErrorMessageMap = Object.assign(
      {},
      this.props.fieldErrorMessageMap,
      errorMessageMap);
    console.warn('final map', map);
    this.setState({
      errorMessages: map
    }, callback || noop);
  }

  protected onSubmit() {
    const data = this.state.formData as T;
    this.validate(data, () => {
      console.warn('Can submit?', this.canSubmit);
      if (this.canSubmit && this.props.onSubmit) {
        this.props.onSubmit(data);
      }
    });
  }

  private getValueFromEvent(event: IHTMLEvent) {

    if (!event || !event.target) {
      return null;
    }

    const target = event.target;
    switch (target.type) {
      case 'checkbox':
        return target.checked;
      case 'date':
        return new Date(target.value);
      default:
        return target.value;
    }
  }

}
