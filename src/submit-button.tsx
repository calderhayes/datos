import * as React from 'react';

export interface ISubmitButtonProps {
  canSubmit: boolean;
  onSubmit: () => void;
  className?: string;
  containerClassName?: string;
}

export class SubmitButton extends React.Component<ISubmitButtonProps, {}> {

  public render() {
    return (
      <div className={this.props.containerClassName || ''}>
        <button
          type='button'
          disabled={!this.props.canSubmit}
          onClick={this.props.onSubmit}
          className={this.props.className || ''}
          >{this.props.children}</button>
      </div>
    );
  }

}
