import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../constant/Colors'; // Adjust the path if needed

const EmailInput = ({ value, onChangeText, placeholder = "Email/Phone Number" }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        backgroundColor: Colors.White, // updated
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.Border, // updated
    },
});

export default EmailInput;
