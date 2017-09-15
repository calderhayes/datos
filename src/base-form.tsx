import * as React from 'react';
import {IHTMLEvent, noop} from 'utility';
import {FieldMessageMap} from 'field-message-map';

export interface IBaseFormProps<T extends object> {
  defaultFormData: T;
  onBlur?: (formData: T) => void;
  onSubmit?: (formData: T) => void;
  validator?: (formData: T) => FieldMessageMap;
  isLoading: boolean;
  formMessages?: Array<string>;
  // We may need something like this if we are validation externally?
  // lastTimeFieldUpdated: number;
  fieldMessageMap: FieldMessageMap;
}

export interface IBaseFormState<T extends object> {
  fieldMessageMap: FieldMessageMap;
  formData: T;
}

export abstract class BaseForm
<T extends object, P extends IBaseFormProps<T>, S extends IBaseFormState<T>>
extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
    this.updateFormData = this.updateFormData.bind(this);
    this.validate = this.validate.bind(this);
    this.defaultValidator = this.defaultValidator.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      fieldMessageMap: new FieldMessageMap(),
      formData: this.props.defaultFormData
    } as S;
  }

  // We may need something like this if we are validating externally?
  /*public componentWillReceiveProps(nextProps: P) {
    if (nextProps.lastTimeFieldUpdated !== this.props.lastTimeFieldUpdated) {
      this.validate(this.state.formData as T);
    }
  }*/

  protected defaultValidator(_: T): FieldMessageMap {
    return new FieldMessageMap();
  };

  protected get canSubmit() {
    return this.state.fieldMessageMap.canSubmit();
  }

  protected updateFormData(event: IHTMLEvent) {
    const value = this.getValueFromEvent(event);
    const name = event.target.name;

    const data = {
      ...(this.state.formData as any)
    };

    data[name] = value;
    this.validate(data);
    this.setState({
      formData: data
    });
    (this.props.onBlur || noop)(data);
  }

  protected validate(data: T, callback?: () => void) {
    const validator = this.props.validator || this.defaultValidator;
    const fieldMessageMap = validator(data);
    const map: FieldMessageMap = this.props
      .fieldMessageMap
      .addOrOverrideWithMap(fieldMessageMap);
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
