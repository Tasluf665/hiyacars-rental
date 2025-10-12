import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constant/Colors'; // Import Colors

const PasswordInput = ({ value, onChangeText, placeholder = "Password" }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
            />
            <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}
            >
                <Ionicons
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color={Colors.TextSecondary} // Use color from Colors.js
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
        position: 'relative',
    },
    input: {
        backgroundColor: Colors.White, // Use Colors.js
        borderRadius: 12,
        padding: 16,
        paddingRight: 50,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.Border, // Use Colors.js
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
});

export default PasswordInput;
