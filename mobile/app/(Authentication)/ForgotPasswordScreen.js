import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

// Components & Constants imported from siblings/parent directories
import EmailInput from '../../components/EmailInput';
import CustomButton from '../../components/CustomButton';
import Colors from '../../constant/Colors';
import CustomeFonts from '../../constant/customeFonts';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');

    const handleContinue = () => {
        console.log('Continue (Reset Password) pressed for email:', email);
        // In a real app, this would trigger the password reset email flow
        // You might navigate to a confirmation screen here.
    };

    const handleSignIn = () => {
        router.back(); // Navigate back to LoginScreen
    };

    const handleCreateAccount = () => {
        router.push('/SignUpScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Logo Section (Top-Left Alignment) */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/icons/car_icon_main.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Header Title and Description */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Reset your password</Text>
                    <Text style={styles.description}>
                        Enter the email address associated with your account and
                        we'll send you a link to reset your password.
                    </Text>
                </View>

                {/* Input Field */}
                <View style={styles.inputSection}>
                    <EmailInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                    // Since this is the only input, we rely on the component's internal placeholder styling.
                    />
                </View>

                {/* Main Action Button */}
                <CustomButton
                    title="Continue"
                    onPress={handleContinue}
                    variant="filled"
                    style={styles.continueButton}
                />

                {/* Secondary Navigation Links */}

                {/* Return to Sign In */}
                <TouchableOpacity style={styles.linkContainer} onPress={handleSignIn}>
                    <Text style={styles.linkText}>Return to sign in</Text>
                </TouchableOpacity>

                {/* Create a New Account */}
                <View style={styles.bottomLinkContainer}>
                    <TouchableOpacity onPress={handleCreateAccount}>
                        <Text style={styles.createAccountText}>Create a New account</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24
    },
    // --- Logo Styles (Consistent with Login/SignUp) ---
    logoContainer: {
        // --- FIX: Back to top-left alignment ---
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 0,
        marginTop: 0, // Removed extra top margin
    },
    logo: {
        // --- FIX: Small, white icon inside the dark circle ---
        width: 100,
        height: 100,
    },
    appName: {
        fontSize: 18,
        fontFamily: CustomeFonts.Lato_Bold,
        color: Colors.TextPrimary,
    },
    // --- Header Title and Description ---
    headerContainer: {
        marginBottom: 40,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 28,
        fontFamily: CustomeFonts.Gilroy_ExtraBold,
        color: Colors.TextPrimary,
        marginBottom: 10,
        textAlign: 'left',
    },
    description: {
        fontSize: 14,
        fontFamily: CustomeFonts.Lato_Regular,
        color: Colors.TextSecondary,
        textAlign: 'left',
        lineHeight: 22,
    },
    inputSection: {
        marginBottom: 30, // Space before the main button
    },
    continueButton: {
        backgroundColor: Colors.Primary,
        marginBottom: 30,
    },
    // --- Navigation Links ---
    linkContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    linkText: {
        fontSize: 16,
        color: Colors.Primary,
        fontFamily: CustomeFonts.Lato_Bold,
    },
    // Positions the last link at the very bottom
    bottomLinkContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 24,
    },
    createAccountText: {
        fontSize: 14,
        color: Colors.TextPrimary,
        fontFamily: CustomeFonts.Lato_Regular,
    },
});

export default ForgotPasswordScreen;
