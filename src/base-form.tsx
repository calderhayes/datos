import * as React from 'react';

export interface IHTMLEvent {
  target: {
    type: string;
    name: string;
    checked?: boolean;
    value?: string;
  };
}

export interface IBaseFormProps<T extends object> {
  formData: T;
  onBlur: (formData: T) => void;
  onSubmit: (formData: T) => void;
  validator: (formData: T) => boolean;
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

  protected get isValid() {
    return this.props.validator(this.props.formData);
  }

  protected isFieldValid(fieldName: string) {
    return !!this.props.fieldErrorMessageMap[fieldName];
  }

  protected onBlur(event: IHTMLEvent) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const data = {
      ...(this.props.formData as any)
    };

    data[name] = value;
    this.props.onBlur(data);
  }

}
