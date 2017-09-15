import * as React from 'react';
import {ExampleForm, IExampleFormData} from './example-form';

export interface IExample1Props {

}

export interface IExample1State {
  formData: IExampleFormData;
  isLoading: boolean;
  serverErrors: Array<string>;
}

export class Example1 extends React.Component<IExample1Props, IExample1State> {

  private serverError: HTMLInputElement = null;

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
      isLoading: false,
      serverErrors: new Array<string>()
    };
  }

  public render() {
    return (
      <div>        
        <h2>Example 1</h2>
        <div className='row'>
          <div className='form-group col-xs-12'>
            <label htmlFor='serverError'>Populate this text box to simulate a server error</label>
            <input
              ref={(input: HTMLInputElement) => this.serverError = input}
              type='text'
              className='form-control'
            />
          </div>  
        </div>
        <ExampleForm
          defaultFormData={this.state.formData}
          isLoading={this.state.isLoading}
          fieldErrorMessageMap={{}}
          formErrorMessages={this.state.serverErrors}
          lastTimeFieldUpdated={(new Date()).getTime()}
          // onBlur={() => { /* noop */ }}
          onSubmit={this.onSubmit}
          // validator={() => { return {}; }}
        />
      </div>
    );
  }

  private onSubmit(formData: IExampleFormData) {
    console.info('Sending FORM data', formData);

    const serverErrors = new Array<string>();
    if (this.serverError && this.serverError.value) {
      serverErrors.push(this.serverError.value);
    }

    this.setState({
      isLoading: true,
      serverErrors
    },
    async () => {
      // Simulate loading
      await new Promise((resolve, _) => {
        setTimeout(() => resolve(), 1000);
      });
      this.setState({
        isLoading: false
      });
    });
    
  }

}
