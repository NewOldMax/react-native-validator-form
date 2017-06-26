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

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const email = event.nativeEvent.text;
        this.setState({ email });
    }

    submit() {
        // your submit logic
    }

    handleSubmit() {
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
                    name="email",
                    label="email"
                    validators=['required', 'isEmail'],
                    errorMessages=['This field is required", "Email invalid']
                    placeholder="Your email"
                    type="text"
                    keyboardType="email-address"
                    value={email}
                    onChange={this.handleChange}
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

You can add your custom rules:
````javascript

import React from 'react';
import { Button } from 'react-native';
import { Form, TextValidator } from 'react-native-validator-form';

class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
        };
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRepeatPassword = this.handleRepeatPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handlePassword(event) {
        const { user } = this.state;
        user.password = event.nativeEvent.text;
        this.setState({ user });
    }

    handleRepeatPassword(event) {
        const { user } = this.state;
        user.repeatPassword = event.nativeEvent.text;
        this.setState({ user });
    }

    submit() {
        // your submit logic
    }

    handleSubmit() {
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
                    name="password",
                    label="text"
                    secureTextEntry: true,
                    validators=['required'],
                    errorMessages=['This field is required']
                    type="text"
                    value={user.password}
                    onChange={this.handlePassword}
                />
                <TextValidator
                    name="repeatPassword",
                    label="text"
                    secureTextEntry: true,
                    validators=['isPasswordMatch','required'],
                    errorMessages=['Password mismatch','This field is required']
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

````

##### [Advanced usage](https://github.com/NewOldMax/react-native-validator-form/wiki)

### API

#### Form

| Prop            | Required | Type     | Default value | Description                                                                                                                  |
|-----------------|----------|----------|---------------|------------------------------------------------------------------------------------------------------------------------------|
| onSubmit        | true     | function |               | Callback for form that fires when all validations are passed                                                                 |
| instantValidate | false    | bool     | true         | If true, form will be validated after each field change. If false, form will be validated only after clicking submit button. |
| onError         | false    | function |               | Callback for form that fires when some of validations are not passed. It will return array of elements which not valid. |

#### All validated fields (Input)

| Prop            | Required | Type     | Default value | Description                                                                            |
|-----------------|----------|----------|---------------|----------------------------------------------------------------------------------------|
| validators      | false    | array    |               | Array of validators. See list of default validators above.                             |
| errorMessages   | false    | array    |               | Array of error messages. Order of messages should be the same as `validators` prop.    |
| name            | true     | string   |               | Name of input                                                                          |
| errorStyle      | false    | object   | { container: { top: 0, left: 0, position: 'absolute' }, text: { color: 'red' }, underlineValidColor: 'gray', underlineInvalidColor: 'red' } }             | Error styles                                                                          |
| validatorListener | false  | function |               | It triggers after each validation. It will return `true` or `false`                    |

### Contributing

This component covers all my needs, but feel free to contribute.