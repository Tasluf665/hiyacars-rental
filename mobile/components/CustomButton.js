import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CustomButton = ({
    title,
    onPress,
    variant = 'filled',
    style,
    icon,
    iconPosition = 'right'
}) => {
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
            <View style={styles.buttonContent}>
                {icon && iconPosition === 'left' && (
                    <View style={styles.iconLeft}>{icon}</View>
                )}
                <Text style={[styles.buttonText, getTextStyle()]}>{title}</Text>
                {icon && iconPosition === 'right' && (
                    <View style={styles.iconRight}>{icon}</View>
                )}
            </View>
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
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
        marginTop: 2,
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
