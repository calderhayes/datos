import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from './base-input';

export interface ITextAreaProps extends IBaseInputProps {
  placeholder?: string;
  rows?: number|null;
  cols?: number|null;
}

export class TextAreaInput extends BaseInput<ITextAreaProps, IBaseInputState> {

  protected type = 'textarea';

  constructor(props: ITextAreaProps) {
    super(props);
  }

  public render() {
    const {
      errorClassName,
      containerClassName,
      errorContainerClassName,
      className,
      fieldMessage,
      ...rest
    } = this.props;

    return (
      <div className={this.resolveContainerClassName()}>
        <textarea
          {...(rest) as any}
          className={this.resolveClassName()}
          value={this.state.value}
          rows={this.props.rows || 3}
          cols={this.props.cols || 1}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

