import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';

export default function ConfirmationScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(2);

    const steps = [
        { id: 0, label: 'Booking details' },
        { id: 1, label: 'Payment methods' },
        { id: 2, label: 'confirmation' },
    ];

    // Booking information data
    const bookingInfo = {
        bookingId: '00451',
        name: 'Benjamin Jack',
        pickupDate: '19 Jan 2024  10:30 am',
        returnDate: '22 Jan 2024  05:00 pm',
        location: 'Shore Dr, Chicago 0062 Usa',
    };

    // Payment data
    const paymentInfo = {
        trxId: '#141mtslv5854d58',
        amount: '$1400',
        serviceFee: '$15',
        totalAmount: '$1415',
    };

    // Car data
    const carInfo = {
        name: 'Tesla Model S',
        description: 'A car with high specs that are rented ot an affordable price.',
        rating: 5.5,
        reviews: '100+Reviews',
        image: require('../../assets/cars/car_2.png'),
    };

    // Animation values
    const lineAnimations = useRef(
        steps.map(() => new Animated.Value(0))
    ).current;

    const circleScales = useRef(
        steps.map(() => new Animated.Value(1))
    ).current;

    useEffect(() => {
        // Animate all lines to complete
        steps.forEach((step, index) => {
            if (index < currentStep) {
                Animated.timing(lineAnimations[index], {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            }
        });

        // Animate current step circle
        Animated.sequence([
            Animated.timing(circleScales[currentStep], {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(circleScales[currentStep], {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleConfirm = () => {
        console.log('Booking confirmed!');
        // Navigate to success screen or home
        router.push('/Home/PaymentSuccessScreen');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Confirmation</Text>
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
                {/* Car Image */}
                <View style={styles.carImageContainer}>
                    <Image source={carInfo.image} style={styles.carImage} resizeMode="contain" />
                </View>

                {/* Car Info */}
                <View style={styles.carInfoSection}>
                    <View style={styles.carInfoHeader}>
                        <Text style={styles.carName}>{carInfo.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>{carInfo.rating}</Text>
                            <Ionicons name="star" size={16} color="#FFA500" />
                        </View>
                    </View>
                    <Text style={styles.carDescription}>{carInfo.description}</Text>
                    <Text style={styles.reviews}>({carInfo.reviews})</Text>
                </View>

                {/* Booking Information */}
                <Text style={styles.sectionTitle}>Booking informational</Text>
                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>• Booking ID</Text>
                        <Text style={styles.infoValue}>{bookingInfo.bookingId}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>• Name</Text>
                        <Text style={styles.infoValue}>{bookingInfo.name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>• Pick up Date</Text>
                        <Text style={styles.infoValue}>{bookingInfo.pickupDate}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>• Return Date</Text>
                        <Text style={styles.infoValue}>{bookingInfo.returnDate}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>• Location</Text>
                        <View style={styles.locationValue}>
                            <Ionicons name="location-outline" size={14} color="#6B7280" />
                            <Text style={styles.infoValue}>{bookingInfo.location}</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Section */}
                <Text style={styles.sectionTitle}>Payment</Text>
                <View style={styles.paymentSection}>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Trx ID</Text>
                        <Text style={styles.paymentValue}>{paymentInfo.trxId}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Amount</Text>
                        <Text style={styles.paymentValue}>{paymentInfo.amount}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Service fee</Text>
                        <Text style={styles.paymentValue}>{paymentInfo.serviceFee}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.paymentRow}>
                        <Text style={styles.totalLabel}>Total amount</Text>
                        <Text style={styles.totalValue}>{paymentInfo.totalAmount}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Payment with</Text>
                        <View style={styles.mastercardLogo}>
                            <View style={[styles.circle, styles.circleRed]} />
                            <View style={[styles.circle, styles.circleOrange]} />
                        </View>
                    </View>
                </View>

                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View style={styles.bottomContainer}>
                <CustomButton
                    title="Confirm"
                    onPress={handleConfirm}
                    variant="filled"
                    style={styles.confirmButton}
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
        paddingBottom: 100,
    },
    carImageContainer: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 20,
        alignItems: 'center',
    },
    carImage: {
        width: '90%',
        height: 180,
    },
    carInfoSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    carInfoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    carName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rating: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    carDescription: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginBottom: 4,
    },
    reviews: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        paddingHorizontal: 20,
        marginTop: 24,
        marginBottom: 16,
    },
    infoSection: {
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    infoValue: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
        textAlign: 'right',
    },
    locationValue: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    paymentSection: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    paymentLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    paymentValue: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
    },
    mastercardLogo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    circleRed: {
        backgroundColor: '#EB001B',
    },
    circleOrange: {
        backgroundColor: '#FF5F00',
        marginLeft: -8,
    },
    bottomSpacer: {
        height: 20,
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
    confirmButton: {
        borderRadius: 30,
        marginBottom: 0,
    },
});
