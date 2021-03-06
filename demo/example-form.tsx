/* tslint:disable:max-file-line-count */
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
  description: string;
  favoriteNumber: number;
  hours: number;
}

export interface IExampleFormProps extends Datos.IBaseFormProps<IExampleFormData> {

}

export interface IExampleFormState extends Datos.IBaseFormState<IExampleFormData> {
  hobbies: Array<Datos.ISelectInputOption>;
}

export const exampleFormFieldNames = {
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  password: 'password',
  birthDate: 'birthDate',
  allGood: 'allGood',
  hobby: 'hobby',
  description: 'description',
  favoriteNumber: 'favoriteNumber',
  hours: 'hours'
};

export class ExampleForm extends Datos.BaseForm<IExampleFormData, IExampleFormProps, IExampleFormState> {

  private readonly names = exampleFormFieldNames;

  public componentWillMount() {
    // I know this isn't the best place to initialize state
    this.setState({
      ...this.state,
      hobbies: [
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
      ]
    });
  }

  public render() {

    const rows = 5;
    const canSubmit = this.canSubmit && !this.props.isLoading;
    // See index.html for the CSS3 required for this spinner
    const spinner = this.props.isLoading ?
      <span className='glyphicon glyphicon-refresh spinning'></span> : null;

    const formErrors = this.props.formMessages.map((m, i) => {
      return (
        <li key={i.toString()}>
          <Datos.ValidationMessage
            fieldMessage={{message: m, preventSubmit: false}}
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
            autoFocus={true}
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            onBlur={this.updateFormData}
            name={this.names.firstName}
            value={this.state.formData.firstName}
            fieldMessage={this.getFieldMessage(this.names.firstName)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.getFieldMessage(this.names.firstName)}
            className='help-block'
            containerClassName='has-error'>
            <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true' />
          </Datos.ValidationMessage>
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
            fieldMessage={this.getFieldMessage(this.names.middleName)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.getFieldMessage(this.names.middleName)}
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
            fieldMessage={this.getFieldMessage(this.names.lastName)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.getFieldMessage(this.names.lastName)}
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
          <label htmlFor={this.names.hours}>Hours</label>
          <Datos.NumberInput
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            placeholder='Hours'
            onBlur={this.updateFormData}
            name={this.names.hours}
            numberValue={this.state.formData.hours}
            fieldMessage={this.getFieldMessage(this.names.hours)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.getFieldMessage(this.names.hours)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='form-group'>
          <label htmlFor={this.names.favoriteNumber}>Favorite Number</label>
          <Datos.IntegerInput
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            onBlur={this.updateFormData}
            name={this.names.favoriteNumber}
            numberValue={this.state.formData.favoriteNumber}
            fieldMessage={this.getFieldMessage(this.names.favoriteNumber)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.getFieldMessage(this.names.favoriteNumber)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='form-group'>
          <label htmlFor={this.names.description}>Description</label>
          <Datos.TextAreaInput
            rows={rows}
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            onBlur={this.updateFormData}
            name={this.names.description}
            value={this.state.formData.description}
            fieldMessage={this.getFieldMessage(this.names.description)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.getFieldMessage(this.names.description)}
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
            fieldMessage={this.getFieldMessage(this.names.birthDate)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.getFieldMessage(this.names.birthDate)}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={this.addRandomHobby}>
              Add Random Hobby
            </button>
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor={this.names.hobby}>Hobby</label>
          <Datos.SelectInput
            options={this.state.hobbies}
            name={this.names.hobby}
            errorContainerClassName='has-error'
            className='form-control'
            onChange={this.updateFormData}
            canHaveUnselected={true}
            unselectedText='No Hobby'
            value={this.state.formData.hobby}
            fieldMessage={this.getFieldMessage(this.names.hobby)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.getFieldMessage(this.names.hobby)}
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
            fieldMessage={this.getFieldMessage(this.names.allGood)}
          />
          <Datos.ValidationMessage
            fieldMessage={this.getFieldMessage(this.names.allGood)}
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
        preventSubmit: true
      });
    }

    if (formData.firstName.length > 0 && formData.lastName.length === 0) {
      errorMap.add(exampleFormFieldNames.lastName, {
        message: 'Cannot provide a first name without a last name!',
        preventSubmit: true
      });
    }

    if (formData.birthDate.getTime() > (new Date()).getTime()) {
      errorMap.add(exampleFormFieldNames.birthDate, {
        message: 'Birth date cannot be in the future!',
        preventSubmit: true
      });
    }

    if (!formData.hobby) {
      errorMap.add(exampleFormFieldNames.hobby, {
        message: 'Must have a hobby selected!',
        preventSubmit: true
      });
    }

    if (!formData.password || formData.password.length === 0) {
      errorMap.add(exampleFormFieldNames.password, {
        message: 'A password must be provided',
        preventSubmit: true
      });
    }

    if (isNaN(formData.hours)) {
      errorMap.add(exampleFormFieldNames.hours, {
        message: 'Hours must be a number',
        preventSubmit: true
      });
    }
    else if (formData.hours < 0) {
      errorMap.add(exampleFormFieldNames.hours, {
        message: 'Hours must be greater than 0',
        preventSubmit: true
      });
    }

    return errorMap;
  }

  private addRandomHobby = () => {
    const newHobby = 'hobby-' + (new Date()).getTime().toString();
    const item: Datos.ISelectInputOption = {
      value: newHobby,
      label: newHobby
    };

    const hobbies = this.state.hobbies.slice(0);
    hobbies.push(item);

    this.setState({
      ...this.state,
      hobbies
    });
  }

}
