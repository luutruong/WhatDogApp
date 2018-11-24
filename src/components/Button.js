import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform, StyleSheet, View, Text } from 'react-native';

type Props = {
    onPress: Function,
    title: string,

    children?: any,
    testID?: string,
    disabled?: ?boolean,
    accessibilityLabel?: string,
    textStyle?: Object,
    buttonStyle?: Object
};
export default class Button extends React.PureComponent<Props> {
    render() {
        const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

        const { children, testID, disabled, onPress, accessibilityLabel, title, textStyle, buttonStyle } = this.props;

        const buttonStyles = [styles.button, buttonStyle];
        const textStyles = [styles.text, textStyle];

        const accessibilityStates = [];
        if (disabled) {
            buttonStyles.push(styles.buttonDisabled);
            textStyles.push(styles.textDisabled);
            accessibilityStates.push('disabled');
        }
        const formattedTitle = Platform.OS === 'android' ? title.toUpperCase() : title;

        let textComponent;
        if (formattedTitle) {
            textComponent = (
                <Text style={textStyles} disabled={disabled}>
                    {formattedTitle}
                </Text>
            );
        }

        return (
            <Touchable
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
                accessibilityStates={accessibilityStates}
                testID={testID}
                disabled={disabled}
                onPress={() => onPress()}
            >
                <View style={buttonStyles}>
                    {children}
                    {textComponent}
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    button: Platform.select({
        ios: {},
        android: {
            elevation: 4,
            backgroundColor: '#2196F3',
            borderRadius: 2
        }
    }),
    buttonDisabled: Platform.select({
        ios: {},
        android: {
            elevation: 0,
            backgroundColor: '#dfdfdf'
        }
    }),
    text: Platform.select({
        ios: {
            // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
            color: '#007AFF',
            textAlign: 'center',
            padding: 8,
            fontSize: 18
        },
        android: {
            color: 'white',
            textAlign: 'center',
            padding: 8,
            fontWeight: '500'
        }
    }),
    textDisabled: Platform.select({
        ios: {
            color: '#cdcdcd'
        },
        android: {
            color: '#a1a1a1'
        }
    })
});
