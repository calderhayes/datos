import * as React from 'react';
import {IFieldMessage} from 'utility';

export interface IValidationMessageProps {
  fieldMessage: IFieldMessage;
  className?: string;
  containerClassName?: string;
}

export class ValidationMessage extends React.Component<IValidationMessageProps, {}> {
  public render() {

    if (!this.props.fieldMessage) {
      return null;
    }

    return (
      <div className={this.props.containerClassName || ''}>
        <span className={this.props.className || ''}>
          {this.props.fieldMessage.message}
        </span>
      </div>
    );
  }
}
