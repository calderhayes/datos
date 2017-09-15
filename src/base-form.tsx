import * as React from 'react';
import {IHTMLEvent, noop, IFieldMessage} from 'utility';

export interface IFieldMessageMap {
  [name: string]: IFieldMessage;
}

export interface IBaseFormProps<T extends object> {
  defaultFormData: T;
  onBlur?: (formData: T) => void;
  onSubmit?: (formData: T) => void;
  validator?: (formData: T) => IFieldMessageMap;
  isLoading: boolean;
  formMessages?: Array<string>;
  // We may need something like this if we are validation externally?
  // lastTimeFieldUpdated: number;
  fieldMessageMap: IFieldMessageMap;
}

export interface IBaseFormState<T extends object> {
  fieldMessageMap: IFieldMessageMap;
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
      fieldMessageMap: {},
      formData: this.props.defaultFormData
    } as S;
  }

  // We may need something like this if we are validating externally?
  /*public componentWillReceiveProps(nextProps: P) {
    if (nextProps.lastTimeFieldUpdated !== this.props.lastTimeFieldUpdated) {
      this.validate(this.state.formData as T);
    }
  }*/

  protected defaultValidator(_: T): IFieldMessageMap {
    return {};
  };

  protected get canSubmit() {
    for (const prop in this.state.fieldMessageMap) {
      if (!this.state.fieldMessageMap.hasOwnProperty(prop)) {
        continue;
      }
      const val = this.state.fieldMessageMap[prop];
      if (val && val.preventSubmitError) {
        return false;
      }
    }

    return true;
  }

  protected onBlur(event: IHTMLEvent) {
    console.warn('original form date', this.state.formData);
    const value = this.getValueFromEvent(event);
    console.warn('value from event', value, event.target.checked);
    const name = event.target.name;

    let data = {
      ...(this.state.formData as any)
    };

    data[name] = value;
    console.warn('new form data', data);
    this.validate(data);
    this.setState({
      formData: data
    });
    (this.props.onBlur || noop)(data);
  }

  protected validate(data: T, callback?: () => void) {
    const validator = this.props.validator || this.defaultValidator;
    const fieldMessageMap = validator(data);
    const map: IFieldMessageMap = Object.assign(
      {},
      this.props.fieldMessageMap,
      fieldMessageMap);
    this.setState({
      fieldMessageMap: map
    }, callback || noop);
  }

  protected onSubmit() {
    const data = this.state.formData as T;
    this.validate(data, () => {
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
