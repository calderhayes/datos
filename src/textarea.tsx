import * as React from 'react';
import {BaseInput, IBaseInputProps, IBaseInputState} from './base-input';

export interface ITextAreaProps extends IBaseInputProps {
  placeholder?: string;
  rows?: number|null;
  cols?: number|null;
}

const defaultRows = 3;
const defaultCols = 1;

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
          rows={this.props.rows || defaultRows}
          cols={this.props.cols || defaultCols}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

