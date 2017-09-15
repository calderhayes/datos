import * as React from 'react';
import {IHTMLEvent, noop} from 'utility';

export interface IBaseFormProps<T extends object> {
  formData: T;
  onBlur?: (formData: T) => void;
  onSubmit?: (formData: T) => void;
  validator?: (formData: T) => boolean;
  isLoading: boolean;
  formErrorMessages?: Array<string>;
  fieldErrorMessageMap: {
    [name: string]: string;
  };
}

export abstract class BaseForm<T extends object, P extends IBaseFormProps<T>, S> extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
  }

  /*protected get isValid() {
    // Having some kind of error here, I suspect it is the tooling
    const data: T = this.props.formData as T;
    return this.props.validator(data);
  }

  protected isFieldValid(fieldName: string) {
    return !!this.props.fieldErrorMessageMap[fieldName];
  }*/

  protected onBlur(event: IHTMLEvent) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const data = {
      ...(this.props.formData as any)
    };

    // TODO: Run validation here?
    // Return error messages as a group, aggregate with props, save to state?

    data[name] = value;
    (this.props.onBlur || noop)(data);
  }

}
