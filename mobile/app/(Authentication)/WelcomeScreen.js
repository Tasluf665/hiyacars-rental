import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { router } from "expo-router";

import Colors from "../../constant/Colors";
import CustomeFonts from "../../constant/customeFonts";

export default function WelcomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary} />

            {/* Header Section */}
            <View style={styles.headerSection}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Text style={styles.logoText}>CR</Text>
                    </View>
                </View>
            </View>

            {/* Main Content Section */}
            <View style={styles.contentSection}>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Welcome to</Text>
                    <Text style={styles.brandText}>Car Rental</Text>
                    <Text style={styles.subtitleText}>
                        Find your perfect ride with ease. Book, drive, and enjoy your journey.
                    </Text>
                </View>

                {/* Feature Highlights */}
                <View style={styles.featuresContainer}>
                    <View style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                            <Text style={styles.featureIconText}>🚗</Text>
                        </View>
                        <Text style={styles.featureText}>Wide Selection</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                            <Text style={styles.featureIconText}>⚡</Text>
                        </View>
                        <Text style={styles.featureText}>Quick Booking</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                            <Text style={styles.featureIconText}>🛡️</Text>
                        </View>
                        <Text style={styles.featureText}>Safe & Secure</Text>
                    </View>
                </View>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/LoginScreen")}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

                <View style={styles.footerText}>
                    <Text style={styles.footerTextStyle}>
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Secondary,
    },
    headerSection: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40,
    },
    logoContainer: {
        alignItems: "center",
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.Primary,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.Primary,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    logoText: {
        fontFamily: CustomeFonts.Gilroy_ExtraBold,
        fontSize: 32,
        color: Colors.White,
        fontWeight: "bold",
    },
    contentSection: {
        flex: 1.5,
        paddingHorizontal: 30,
        justifyContent: "center",
    },
    textContainer: {
        marginBottom: 40,
    },
    titleText: {
        fontFamily: CustomeFonts.Gilroy_Light,
        fontSize: 28,
        color: Colors.White,
        textAlign: "center",
        marginBottom: 8,
    },
    brandText: {
        fontFamily: CustomeFonts.Gilroy_ExtraBold,
        fontSize: 36,
        color: Colors.Primary,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 16,
    },
    subtitleText: {
        fontFamily: CustomeFonts.Lato_Regular,
        fontSize: 16,
        color: Colors.DarkGray,
        textAlign: "center",
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    featuresContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    featureItem: {
        alignItems: "center",
        flex: 1,
    },
    featureIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.Primary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    featureIconText: {
        fontSize: 20,
    },
    featureText: {
        fontFamily: CustomeFonts.Lato_Regular,
        fontSize: 12,
        color: Colors.White,
        textAlign: "center",
    },
    bottomSection: {
        paddingHorizontal: 30,
        paddingBottom: 40,
    },
    button: {
        backgroundColor: Colors.Primary,
        borderRadius: 25,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.Primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        fontFamily: CustomeFonts.Gilroy_ExtraBold,
        fontSize: 18,
        color: Colors.White,
        fontWeight: "bold",
    },
    footerText: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    footerTextStyle: {
        fontFamily: CustomeFonts.Lato_Regular,
        fontSize: 12,
        color: Colors.DarkGray,
        textAlign: "center",
        lineHeight: 18,
    },
});
