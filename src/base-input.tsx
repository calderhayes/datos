import * as React from 'react';
import * as cx from 'classnames';
import {IHTMLEvent, noop, IFieldMessage, FieldMessageType} from './utility';

export interface IBaseInputProps {
  value?: string;
  name: string;
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
}

export abstract class BaseInput<P extends IBaseInputProps, S extends IBaseInputState> extends React.Component<P, S> {

  protected readonly abstract type: string;

  constructor(props: P) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.resolveClassName = this.resolveClassName.bind(this);
    this.resolveContainerClassName = this.resolveContainerClassName.bind(this);

    this.state = {
      value: this.props.value,
      isUsed: false,
      isChanged: false
    } as S;
  }

  public componentWillReceiveProps(nextProps: P) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
        isChanged: true
      });
    }
  }

  protected onChange(event: IHTMLEvent) {
    const value = event.target.value;

    event.persist();
    this.setState({
      value,
      isChanged: true
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

    const fieldMessageType = fieldMessage && fieldMessage.fieldMessageType ?
      fieldMessage.fieldMessageType : FieldMessageType.ERROR;

    return cx({
      [className]: !!className,
      [errorClassName]: !!fieldMessage
        && !!errorClassName
        && fieldMessageType === FieldMessageType.ERROR,
      [warnClassName]: !!fieldMessage
        && !!warnClassName
        && fieldMessageType === FieldMessageType.WARN
    });
  }

  protected resolveContainerClassName() {
    const {
      containerClassName,
      errorContainerClassName,
      warnContainerClassName,
      fieldMessage} = this.props as P;

    const fieldMessageType = fieldMessage && fieldMessage.fieldMessageType ?
      fieldMessage.fieldMessageType : FieldMessageType.ERROR;

    return cx({
      [containerClassName]: !!containerClassName,
      [errorContainerClassName]: !!fieldMessage
        && !!errorContainerClassName
        && fieldMessageType === FieldMessageType.ERROR,
      [warnContainerClassName]: !!fieldMessage
        && !!warnContainerClassName
        && fieldMessageType === FieldMessageType.WARN
    });
  }

}
