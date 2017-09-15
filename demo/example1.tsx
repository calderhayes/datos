import * as React from 'react';
import {ExampleForm, IExampleFormData} from './example-form';

export interface IExample1Props {

}

export interface IExample1State {
  formData: IExampleFormData;
  isLoading: boolean;
}

export class Example1 extends React.Component<IExample1Props, IExample1State> {

  constructor(props: IExample1Props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    // tslint:disable-next-line:no-magic-numbers
    const birthDate = new Date(1988, 12, 13);
    this.state = {
      formData: {
        firstName: 'bobz',
        middleName: '',
        lastName: '',
        birthDate
      },
      isLoading: false
    };
  }

  public render() {
    return (
      <div>
        <h2>Example 1</h2>
        <ExampleForm
          defaultFormData={this.state.formData}
          isLoading={this.state.isLoading}
          fieldErrorMessageMap={{}}
          formErrorMessages={new Array<string>()}
          lastTimeFieldUpdated={(new Date()).getTime()}
          // onBlur={() => { /* noop */ }}
          onSubmit={this.onSubmit}
          // validator={() => { return {}; }}
        />
      </div>
    );
  }

  private onSubmit() {
    this.setState({
      isLoading: true
    },
    async () => {
      // Simulate loading
      await new Promise((resolve, _) => {
        setTimeout(() => resolve(), 2000);
      });
      this.setState({
        isLoading: false
      });
    });
    
  }

}
