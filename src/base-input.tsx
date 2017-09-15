import * as React from 'react';
import {IHTMLEvent, noop, IFieldMessage, FieldMessageType} from 'utility';
import * as cx from 'classnames';

export interface IBaseInputProps {
  value: string;
  name: string;
  type: string;
  disabled?: boolean;
  className?: string;
  onChange?: (event: IHTMLEvent) => void;
  onBlur?: (event: IHTMLEvent) => void;
  fieldMessage?: IFieldMessage|null;
  errorClassName?: string;
  warnClassName?: string;
  containerClassName?: string;
  errorContainerClassName?: string;
  warnContainerClassName?: string;
}

export interface IBaseInputState {
  value: string;
  isChanged: boolean;
  isUsed: boolean;
  isChecked: boolean;
}

export class BaseInput<P extends IBaseInputProps, S extends IBaseInputState> extends React.Component<P, S> {

  constructor(props: P) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.resolveClassName = this.resolveClassName.bind(this);
    this.resolveContainerClassName = this.resolveContainerClassName.bind(this);

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

  protected resolveClassName() {
    const {
      className,
      errorClassName,
      warnClassName,
      fieldMessage} = this.props as P;
    return cx({
      [className]: !!className,
      [errorClassName]: !!fieldMessage
        && !!errorClassName
        && fieldMessage.fieldMessageType === FieldMessageType.ERROR,
      [warnClassName]: !!fieldMessage
        && !!warnClassName
        && fieldMessage.fieldMessageType === FieldMessageType.WARN
    });
  }

  protected resolveContainerClassName() {
    const {
      containerClassName,
      errorContainerClassName,
      warnContainerClassName,
      fieldMessage} = this.props as P;
    return cx({
      [containerClassName]: !!containerClassName,
      [errorContainerClassName]: !!fieldMessage
        && !!errorContainerClassName
        && fieldMessage.fieldMessageType === FieldMessageType.ERROR,
      [warnContainerClassName]: !!fieldMessage
        && !!warnContainerClassName
        && fieldMessage.fieldMessageType === FieldMessageType.WARN
    });
  }

}
