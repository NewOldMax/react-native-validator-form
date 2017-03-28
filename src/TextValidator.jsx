/* eslint-disable */
import React from 'react';
import { TextInput, View, Text } from 'react-native';
/* eslint-enable */
import Input from './Input';

export default class TextValidator extends Input {

    render() {
        /* eslint-disable no-unused-vars */
        const {
            errorMessage,
            validators,
            requiredError,
            underlineColorAndroid,
            errorStyle,
            ...rest
        } = this.props;
        /* eslint-enable */
        const error = this.state.isValid ? '' : this.getErrorMessage();
        let underlineColor = underlineColorAndroid;
        if (!underlineColor) {
            underlineColor = !this.state.isValid ? errorStyle.underlineInvalidColor : errorStyle.underlineValidColor;
        }
        return (
            <View position="relative">
                <TextInput
                    {...rest}
                    underlineColorAndroid={underlineColor}
                    ref={(r) => { this.input = r; }}
                />
                <View {...errorStyle.container}>
                    <Text style={errorStyle.text}>{error}</Text>
                </View>
            </View>
        );
    }
}
