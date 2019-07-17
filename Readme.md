## Validation component for react-native forms

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/react-native-validator-form.svg)](https://badge.fury.io/js/react-native-validator-form)
[![Build Status](https://travis-ci.org/NewOldMax/react-native-validator-form.svg?branch=master)](https://travis-ci.org/NewOldMax/react-native-validator-form)

Simple form validation component for React-Native inspired by [formsy-react](https://github.com/christianalfoni/formsy-react).
Web version: [react-material-ui-form-validator](https://github.com/NewOldMax/react-material-ui-form-validator)

Unfortunately I don't have Mac, so this library is tested only on Android.

Supported types:
+ TextInput

Default validation rules:
+ matchRegexp
+ isEmail
+ isEmpty
+ required
+ trim
+ isNumber
+ isFloat
+ isPositive
+ minNumber
+ maxNumber
+ minFloat
+ maxFloat
+ minStringLength
+ maxStringLength
+ isString

Some rules can accept extra parameter, example:
````javascript
<TextValidator
   {...someProps}
   validators={['minNumber:0', 'maxNumber:255', 'matchRegexp:^[0-9]$']}
/>
````

### Example

<img src="https://raw.githubusercontent.com/NewOldMax/react-native-validator-form/master/examples/example.gif" width="285">

### Usage

````javascript

import React from 'react';
import { Button } from 'react-native';
import { Form, TextValidator } from 'react-native-validator-form';

class MyForm extends React.Component {
    state = {
        email: '',
    }

    handleChange = (email) => {
        this.setState({ email });
    }

    submit = () => {
        // your submit logic
    }

    handleSubmit = () => {
        this.refs.form.submit();
    }

    render() {
        const { email } = this.state;
        return (
            <Form
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    name="email"
                    label="email"
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email invalid']}
                    placeholder="Your email"
                    type="text"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={this.handleChange}
                />
                 <Button
                    title="Submit"
                    onPress={this.handleSubmit}
                />
            </Form>
        );
    }
}

````

#### You can add your own rules
````javascript
Form.addValidationRule('isPasswordMatch', (value) => {
    if (value !== this.state.user.password) {
        return false;
    }
    return true;
});
````
And remove them
````javascript
componentWillUnmount() {
    Form.removeValidationRule('isPasswordMatch');
}
````
Usage
````javascript
import React from 'react';
import { Button } from 'react-native';
import { Form, TextValidator } from 'react-native-validator-form';

class ResetPasswordForm extends React.Component {
    state = {
        user: {},
    }

    componentWillMount() {
        // custom rule will have name 'isPasswordMatch'
        Form.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        Form.removeValidationRule('isPasswordMatch');
    }

    handlePassword = (event) => {
        const { user } = this.state;
        user.password = event.nativeEvent.text;
        this.setState({ user });
    }

    handleRepeatPassword = (event) => {
        const { user } = this.state;
        user.repeatPassword = event.nativeEvent.text;
        this.setState({ user });
    }

    submit = () => {
        // your submit logic
    }

    handleSubmit = () => {
        this.refs.form.submit();
    }

    render() {
        const { user } = this.state;
        return (
            <Form
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    name="password"
                    label="text"
                    secureTextEntry
                    validators={['required']}
                    errorMessages={['This field is required']}
                    type="text"
                    value={user.password}
                    onChange={this.handlePassword}
                />
                <TextValidator
                    name="repeatPassword"
                    label="text"
                    secureTextEntry
                    validators={['isPasswordMatch','required']}
                    errorMessages={['Password mismatch','This field is required']}
                    type="text"
                    value={user.repeatPassword}
                    onChange={this.handleRepeatPassword}
                />
                <Button
                    title="Submit"
                    onPress={this.handleSubmit}
                />
            </Form>
        );
    }
}
````

##### [Advanced usage](https://github.com/NewOldMax/react-native-validator-form/wiki)

### API

#### Form

+ Props

| Prop            | Required | Type     | Default value | Description                                                                                                                  |
|-----------------|----------|----------|---------------|------------------------------------------------------------------------------------------------------------------------------|
| onSubmit        | true     | function |               | Callback for form that fires when all validations are passed                                                                 |
| instantValidate | false    | bool     | true         | If true, form will be validated after each field change. If false, form will be validated only after clicking submit button. |
| onError         | false    | function |               | Callback for form that fires when some of validations are not passed. It will return array of elements which not valid. |
| debounceTime    | false    | number   | 0             | Debounce time for validation i.e. your validation will run after `debounceTime` ms when you stop changing your input |

+ Methods

| Name             | Params | Return | Descriptipon                                       |
|------------------|--------|--------|----------------------------------------------------|
| resetValidations |        |        | Reset validation messages for all validated inputs |
| isFormValid      | dryRun: bool (default true) | Promise   | Get form validation state in a Promise (`true` if whole form is valid). Run with `dryRun = false` to show validation errors on form |

#### All validated fields (ValidatorComponent)

+ Props

| Prop            | Required | Type     | Default value | Description                                                                            |
|-----------------|----------|----------|---------------|----------------------------------------------------------------------------------------|
| validators      | false    | array    |               | Array of validators. See list of default validators above.                             |
| errorMessages   | false    | array    |               | Array of error messages. Order of messages should be the same as `validators` prop.    |
| name            | true     | string   |               | Name of input                                                                          |
| errorStyle      | false    | object   | { container: { top: 0, left: 0, position: 'absolute' }, text: { color: 'red' }, underlineValidColor: 'gray', underlineInvalidColor: 'red' } }             | Error styles                                                                          |
| validatorListener | false  | function |               | It triggers after each validation. It will return `true` or `false`                    |
| withRequiredValidator | false | bool  |               | Allow to use `required` validator in any validation trigger, not only form submit      |

+ Methods

| Name             | Params | Return | Descriptipon                                       |
|------------------|--------|--------|----------------------------------------------------|
| getErrorMessage  |        |        | Get error validation message                       |
| validate         | value: any, includeRequired: bool | | Run validation for current component |
| isValid          |        | bool   | Return current validation state                    |
| makeInvalid      |        |        | Set invalid validation state                       |
| makeValid        |        |        | Set valid validation state                         |

### Contributing

This component covers all my needs, but feel free to contribute.