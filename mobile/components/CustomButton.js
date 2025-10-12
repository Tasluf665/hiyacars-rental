import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, variant = 'filled', style }) => {
    const getButtonStyle = () => {
        switch (variant) {
            case 'filled':
                return styles.filledButton;
            case 'white':
                return styles.whiteButton;
            case 'outline':
                return styles.outlineButton;
            default:
                return styles.filledButton;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'filled':
                return styles.filledButtonText;
            case 'white':
                return styles.whiteButtonText;
            case 'outline':
                return styles.outlineButtonText;
            default:
                return styles.filledButtonText;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle(), style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.buttonText, getTextStyle()]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    filledButton: {
        backgroundColor: '#374151',
    },
    whiteButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    filledButtonText: {
        color: '#FFFFFF',
    },
    whiteButtonText: {
        color: '#000000',
    },
    outlineButtonText: {
        color: '#000000',
    },
});

export default CustomButton;
