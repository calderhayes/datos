import * as React from 'react';
import * as Datos from '../src';

export interface IExampleFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  password: string;
  birthDate: Date;
  allGood: boolean;
  hobby: string;
}

export interface IExampleFormProps extends Datos.IBaseFormProps<IExampleFormData> {

}

export interface IExampleFormState extends Datos.IBaseFormState<IExampleFormData> {

}

export const exampleFormFieldNames = {
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  password: 'password',
  birthDate: 'birthDate',
  allGood: 'allGood',
  hobby: 'hobby'
};

const hobbies = [
  {
    value: 'baseball',
    label: 'Baseball'
  },
  {
    value: 'pcs',
    label: 'Windows Desktops'
  },
  {
    value: 'macs',
    label: 'Apple Macintosh'
  }
];

export class ExampleForm extends Datos.BaseForm<IExampleFormData, IExampleFormProps, IExampleFormState> {

  private readonly names = exampleFormFieldNames;

  public render() {

    const canSubmit = this.canSubmit && !this.props.isLoading;
    // See index.html for the CSS3 required for this spinner
    const spinner = this.props.isLoading ?
      <span className='glyphicon glyphicon-refresh spinning'></span> : null;

    const formErrors = this.props.formMessages.map((m, i) => {
      return (
        <li key={i.toString()}>
          <Datos.ValidationMessage
            fieldMessage={{message: m, preventSubmitError: false}}
            className='help-block'
            containerClassName='has-error'
          />
        </li>
      );
    });

    let formError: JSX.Element = null;
    if (formErrors.length > 0) {
      formError = (
        <div>
          <span>Server general errors:</span>
          <ul>
            {formErrors}
          </ul>
        </div>
      );
    }

    return (
      <form className='form'>

        <ul>
          {formError}
        </ul>

        <div className='form-group'>
          <label htmlFor={this.names.firstName}>First Name</label>
          <Datos.TextInput
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            onBlur={this.updateFormData}
            name={this.names.firstName}
            value={this.state.formData.firstName}
            fieldMessage={this.state.fieldMessageMap.get(this.names.firstName)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.state.fieldMessageMap.get(this.names.firstName)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='form-group'>
          <label htmlFor={this.names.middleName}>Middle Name</label>
          <Datos.TextInput
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            placeholder='Middle Name'
            onBlur={this.updateFormData}
            name={this.names.middleName}
            value={this.state.formData.middleName}
            fieldMessage={this.state.fieldMessageMap.get(this.names.middleName)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.state.fieldMessageMap.get(this.names.middleName)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='form-group'>
          <label htmlFor={this.names.lastName}>Last Name</label>
          <Datos.TextInput
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            onBlur={this.updateFormData}
            name={this.names.lastName}
            value={this.state.formData.lastName}
            fieldMessage={this.state.fieldMessageMap.get(this.names.lastName)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.state.fieldMessageMap.get(this.names.lastName)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='form-group'>
          <label htmlFor={this.names.password}>Password</label>
          <Datos.PasswordInput
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            onBlur={this.updateFormData}
            name={this.names.password}
            value={this.state.formData.password}
            fieldMessage={this.state.fieldMessageMap.get(this.names.password)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.state.fieldMessageMap.get(this.names.password)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='form-group'>
          <label htmlFor={this.names.birthDate}>Birth Date</label>
          <Datos.DateTimeInput
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            onBlur={this.updateFormData}
            name={this.names.birthDate}
            value={this.state.formData.birthDate.toISOString()}
            fieldMessage={this.state.fieldMessageMap.get(this.names.birthDate)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.state.fieldMessageMap.get(this.names.birthDate)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='form-group'>
          <label htmlFor={this.names.hobby}>Hobby</label>
          <Datos.SelectInput
            defaultOptions={hobbies}
            name={this.names.hobby}
            errorContainerClassName='has-error'
            className='form-control'
            onChange={this.updateFormData}
            canHaveUnselected={true}
            value={this.state.formData.hobby}
            fieldMessage={this.state.fieldMessageMap.get(this.names.hobby)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.state.fieldMessageMap.get(this.names.hobby)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='form-check'>
          <label htmlFor={this.names.allGood} className='form-check-label'>All Good?</label>
          <Datos.CheckboxInput
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-check-input'
            onChange={this.updateFormData}
            name={this.names.allGood}
            checked={this.state.formData.allGood}
            fieldMessage={this.state.fieldMessageMap.get(this.names.allGood)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.state.fieldMessageMap.get(this.names.allGood)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <Datos.SubmitButton
          className='btn btn-primary'
          canSubmit={canSubmit}
          onSubmit={this.onSubmit}
        >
          {spinner} Submit Data
        </Datos.SubmitButton>

      </form>
    );

  }

  protected defaultValidator(formData: IExampleFormData): Datos.FieldMessageMap {
    const errorMap = new Datos.FieldMessageMap();
    if (formData.firstName.indexOf('z') !== -1) {
      // Some arbitrary tule
      errorMap.add(exampleFormFieldNames.firstName, {
        message: 'First name cannot contain a "z"!',
        preventSubmitError: true
      });
    }

    if (formData.firstName.length > 0 && formData.lastName.length === 0) {
      errorMap.add(exampleFormFieldNames.lastName, {
        message: 'Cannot provide a first name without a last name!',
        preventSubmitError: true
      });
    }

    if (formData.birthDate.getTime() > (new Date()).getTime()) {
      errorMap.add(exampleFormFieldNames.birthDate, {
        message: 'Birth date cannot be in the future!',
        preventSubmitError: true
      });
    }

    if (!formData.hobby) {
      errorMap.add(exampleFormFieldNames.hobby, {
        message: 'Must have a hobby selected!',
        preventSubmitError: true
      });
    }

    if (!formData.password || formData.password.length === 0) {
      errorMap.add(exampleFormFieldNames.password, {
        message: 'A password must be provided',
        preventSubmitError: true
      });
    }

    return errorMap;
  }

}
