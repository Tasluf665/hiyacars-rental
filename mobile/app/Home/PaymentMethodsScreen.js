import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';

export default function PaymentMethodsScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [cardData, setCardData] = useState({
        nameOnCard: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        country: 'United States',
        zip: '',
    });

    const steps = [
        { id: 0, label: 'Booking details' },
        { id: 1, label: 'Payment methods' },
        { id: 2, label: 'confirmation' },
    ];

    // Animation values
    const lineAnimations = useRef(
        steps.map(() => new Animated.Value(0))
    ).current;

    const circleScales = useRef(
        steps.map(() => new Animated.Value(1))
    ).current;

    useEffect(() => {
        // Animate lines based on current step
        steps.forEach((step, index) => {
            if (index < currentStep) {
                Animated.timing(lineAnimations[index], {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            } else {
                Animated.timing(lineAnimations[index], {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        });

        // Animate current step circle
        steps.forEach((step, index) => {
            if (index === currentStep) {
                Animated.sequence([
                    Animated.timing(circleScales[index], {
                        toValue: 1.2,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(circleScales[index], {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        });
    }, [currentStep]);

    const handleContinue = () => {
        // Validate payment form
        // if (!cardData.nameOnCard || !cardData.email || !cardData.cardNumber) {
        //     alert('Please fill in all required card information');
        //     return;
        // }

        // if (!cardData.expiryDate || !cardData.cvc) {
        //     alert('Please enter card expiry date and CVC');
        //     return;
        // }

        // if (!termsAccepted) {
        //     alert('Please accept terms and conditions');
        //     return;
        // }

        // console.log('Payment data:', cardData);

        // Navigate to Confirmation screen
        router.push('/Home/ConfirmationScreen');
    };

    const formatCardNumber = (text) => {
        // Remove all non-digit characters
        const cleaned = text.replace(/\D/g, '');
        // Add space every 4 digits
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted.substring(0, 19); // Max 16 digits + 3 spaces
    };

    const formatExpiryDate = (text) => {
        // Remove all non-digit characters
        const cleaned = text.replace(/\D/g, '');
        // Add slash after 2 digits
        if (cleaned.length >= 2) {
            return cleaned.substring(0, 2) + ' / ' + cleaned.substring(2, 4);
        }
        return cleaned;
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment methods</Text>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Animated Progress Stepper */}
            <View style={styles.stepperContainer}>
                <View style={styles.stepperContent}>
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <View style={styles.stepItem}>
                                <Animated.View
                                    style={[
                                        styles.stepCircle,
                                        index <= currentStep && styles.stepCircleActive,
                                        {
                                            transform: [{ scale: circleScales[index] }],
                                        },
                                    ]}
                                >
                                    {index < currentStep ? (
                                        <Ionicons name="checkmark" size={16} color="#FFF" />
                                    ) : (
                                        <View
                                            style={[
                                                styles.innerCircle,
                                                index === currentStep && styles.innerCircleActive,
                                            ]}
                                        />
                                    )}
                                </Animated.View>
                                <Text
                                    style={[
                                        styles.stepLabel,
                                        index <= currentStep && styles.stepLabelActive,
                                    ]}
                                >
                                    {step.label}
                                </Text>
                            </View>

                            {index < steps.length - 1 && (
                                <View style={styles.lineContainer}>
                                    <View style={styles.lineBackground} />
                                    <Animated.View
                                        style={[
                                            styles.lineProgress,
                                            {
                                                width: lineAnimations[index].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0%', '100%'],
                                                }),
                                            },
                                        ]}
                                    />
                                </View>
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Credit Card Display */}
                <View style={styles.creditCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.masterCardLogo}>
                            <View style={[styles.circle, styles.circleRed]} />
                            <View style={[styles.circle, styles.circleOrange]} />
                        </View>
                        <Text style={styles.visaText}>VISA</Text>
                    </View>

                    <View style={styles.cardChip}>
                        <View style={styles.chipContent}>
                            <View style={styles.chipLine} />
                            <View style={styles.chipLine} />
                        </View>
                    </View>

                    <Text style={styles.cardName}>BANJAMIN JACK</Text>
                    <Text style={styles.cardNumber}>9655    9655    9655    9655</Text>
                    <Text style={styles.cardExpiry}>Expire: 10-5-2030</Text>

                    {/* Card background circles */}
                    <View style={styles.cardCircle1} />
                    <View style={styles.cardCircle2} />
                </View>

                {/* Card Information Form */}
                <Text style={styles.sectionTitle}>Card information</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name on Card"
                        placeholderTextColor="#9CA3AF"
                        value={cardData.nameOnCard}
                        onChangeText={(text) => setCardData({ ...cardData, nameOnCard: text })}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#9CA3AF"
                        value={cardData.email}
                        onChangeText={(text) => setCardData({ ...cardData, email: text })}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Card Number"
                        placeholderTextColor="#9CA3AF"
                        value={cardData.cardNumber}
                        onChangeText={(text) =>
                            setCardData({ ...cardData, cardNumber: formatCardNumber(text) })
                        }
                        keyboardType="number-pad"
                        maxLength={19}
                    />
                    <View style={styles.cardLogos}>
                        <FontAwesome name="cc-visa" size={24} color="#1A1F71" />
                        <FontAwesome name="cc-mastercard" size={24} color="#EB001B" />
                        <FontAwesome name="cc-amex" size={24} color="#006FCF" />
                        <FontAwesome name="cc-discover" size={24} color="#FF6000" />
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={[styles.inputContainer, styles.halfInput]}>
                        <TextInput
                            style={styles.input}
                            placeholder="MM / YY"
                            placeholderTextColor="#9CA3AF"
                            value={cardData.expiryDate}
                            onChangeText={(text) =>
                                setCardData({ ...cardData, expiryDate: formatExpiryDate(text) })
                            }
                            keyboardType="number-pad"
                            maxLength={7}
                        />
                    </View>
                    <View style={[styles.inputContainer, styles.halfInput]}>
                        <TextInput
                            style={styles.input}
                            placeholder="CVC"
                            placeholderTextColor="#9CA3AF"
                            value={cardData.cvc}
                            onChangeText={(text) =>
                                setCardData({ ...cardData, cvc: text.replace(/\D/g, '') })
                            }
                            keyboardType="number-pad"
                            maxLength={4}
                            secureTextEntry
                        />
                        <Ionicons name="card-outline" size={20} color="#9CA3AF" />
                    </View>
                </View>

                {/* Country or Region */}
                <Text style={styles.sectionTitle}>Country or region</Text>

                <TouchableOpacity style={styles.dropdownContainer}>
                    <Text style={styles.dropdownText}>{cardData.country}</Text>
                    <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="ZIP"
                        placeholderTextColor="#9CA3AF"
                        value={cardData.zip}
                        onChangeText={(text) => setCardData({ ...cardData, zip: text })}
                        keyboardType="number-pad"
                    />
                </View>

                {/* Terms & Continue */}
                <TouchableOpacity
                    style={styles.termsContainer}
                    onPress={() => setTermsAccepted(!termsAccepted)}
                >
                    <View style={[styles.checkbox, termsAccepted && styles.checkboxActive]}>
                        {termsAccepted && <Ionicons name="checkmark" size={16} color="#FFF" />}
                    </View>
                    <Text style={styles.termsText}>Trams & continue</Text>
                    <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
                </TouchableOpacity>

                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View style={styles.bottomContainer}>
                <CustomButton
                    title="Continue"
                    onPress={handleContinue}
                    variant="filled"
                    style={styles.continueButton}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepperContainer: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    stepperContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    stepItem: {
        alignItems: 'center',
        zIndex: 1,
    },
    stepCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    stepCircleActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#9CA3AF',
    },
    innerCircleActive: {
        backgroundColor: '#FFF',
    },
    stepLabel: {
        fontSize: 11,
        color: '#9CA3AF',
        textAlign: 'center',
        width: 80,
    },
    stepLabelActive: {
        color: '#000',
        fontWeight: '600',
    },
    lineContainer: {
        flex: 1,
        height: 28,
        justifyContent: 'center',
        position: 'relative',
        marginHorizontal: 4,
    },
    lineBackground: {
        height: 2,
        backgroundColor: '#E5E7EB',
        position: 'absolute',
        width: '100%',
    },
    lineProgress: {
        height: 2,
        backgroundColor: '#000',
        position: 'absolute',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100,
    },
    creditCard: {
        backgroundColor: '#2C3333',
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
        height: 200,
        position: 'relative',
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    masterCardLogo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    circleRed: {
        backgroundColor: '#EB001B',
    },
    circleOrange: {
        backgroundColor: '#FF5F00',
        marginLeft: -10,
    },
    visaText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        fontStyle: 'italic',
    },
    cardChip: {
        width: 40,
        height: 32,
        backgroundColor: '#F5C542',
        borderRadius: 6,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipContent: {
        width: 30,
        height: 24,
    },
    chipLine: {
        height: 2,
        backgroundColor: '#D4A017',
        marginVertical: 3,
    },
    cardName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 8,
        letterSpacing: 1,
    },
    cardNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 12,
        letterSpacing: 2,
    },
    cardExpiry: {
        fontSize: 12,
        color: '#FFF',
        opacity: 0.8,
    },
    cardCircle1: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        top: -50,
        right: -50,
    },
    cardCircle2: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        bottom: -80,
        right: -60,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#000',
        paddingVertical: 12,
    },
    cardLogos: {
        flexDirection: 'row',
        gap: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    halfInput: {
        flex: 1,
        marginBottom: 0,
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    dropdownText: {
        fontSize: 15,
        color: '#000',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    termsText: {
        fontSize: 14,
        color: '#6B7280',
        flex: 1,
    },
    bottomSpacer: {
        height: 40,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 5,
    },
    continueButton: {
        borderRadius: 30,
        marginBottom: 0,
    },
});
