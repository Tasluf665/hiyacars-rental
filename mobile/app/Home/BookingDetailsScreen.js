import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Switch,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import DateTimePickerModal from '../../components/DateTimePickerModal';

export default function BookingDetailsScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [bookWithDriver, setBookWithDriver] = useState(false);
    const [selectedGender, setSelectedGender] = useState('Male');
    const [selectedRentalType, setSelectedRentalType] = useState('Day');

    // Single date picker state
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pickupDate, setPickupDate] = useState(() => {
        const date = new Date();
        date.setHours(10, 30, 0, 0);
        return date;
    });
    const [returnDate, setReturnDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 3); // Default to 3 days later
        date.setHours(17, 0, 0, 0);
        return date;
    });

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contact: '',
        location: 'Shore Dr, Chicago 0062 Usa',
    });

    const steps = [
        { id: 0, label: 'Booking details' },
        { id: 1, label: 'Payment methods' },
        { id: 2, label: 'confirmation' },
    ];

    const genderOptions = ['Male', 'Female', 'Others'];
    const rentalTypes = ['Hour', 'Day', 'Weekly', 'Monthly'];

    // Animation values for each step line
    const lineAnimations = useRef(
        steps.map(() => new Animated.Value(0))
    ).current;

    // Animation values for step circles
    const circleScales = useRef(
        steps.map(() => new Animated.Value(1))
    ).current;

    useEffect(() => {
        // Animate lines based on current step
        steps.forEach((step, index) => {
            if (index < currentStep) {
                // Animate line to full width for completed steps
                Animated.timing(lineAnimations[index], {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            } else {
                // Reset line for upcoming steps
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

    const formatDate = (date) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day}/ ${month} /${year}`;
    };

    const handlePayNow = () => {
        // Validate form data
        // if (!formData.fullName || !formData.email || !formData.contact) {
        //     alert('Please fill in all required fields');
        //     return;
        // }

        // console.log('Booking details:', formData);

        // Navigate to Payment Methods screen
        router.push('/Home/PaymentMethodsScreen');
    };

    // Single handler for both dates
    const handleDateConfirm = (startDate, endDate) => {
        setPickupDate(startDate);
        setReturnDate(endDate);
        setShowDatePicker(false);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking Details</Text>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Animated Progress Stepper */}
            <View style={styles.stepperContainer}>
                <View style={styles.stepperContent}>
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            {/* Step Item */}
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

                            {/* Connecting Line */}
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
                {/* Book with Driver */}
                <View style={styles.driverCard}>
                    <View style={styles.driverCardContent}>
                        <View>
                            <Text style={styles.driverTitle}>Book with driver</Text>
                            <Text style={styles.driverSubtitle}>
                                Don't have a driver? book with driver.
                            </Text>
                        </View>
                        <Switch
                            value={bookWithDriver}
                            onValueChange={setBookWithDriver}
                            trackColor={{ false: '#E5E7EB', true: '#D1D5DB' }}
                            thumbColor={bookWithDriver ? '#6B7280' : '#F3F4F6'}
                        />
                    </View>
                </View>

                {/* Full Name Input */}
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name*"
                        placeholderTextColor="#9CA3AF"
                        value={formData.fullName}
                        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                    />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address*"
                        placeholderTextColor="#9CA3AF"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        keyboardType="email-address"
                    />
                </View>

                {/* Contact Input */}
                <View style={styles.inputContainer}>
                    <Ionicons name="call-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contact*"
                        placeholderTextColor="#9CA3AF"
                        value={formData.contact}
                        onChangeText={(text) => setFormData({ ...formData, contact: text })}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Gender Selection */}
                <Text style={styles.sectionTitle}>Gender</Text>
                <View style={styles.genderContainer}>
                    {genderOptions.map((gender) => (
                        <TouchableOpacity
                            key={gender}
                            style={[
                                styles.genderButton,
                                selectedGender === gender && styles.genderButtonActive,
                            ]}
                            onPress={() => setSelectedGender(gender)}
                        >
                            <Ionicons
                                name={
                                    gender === 'Male'
                                        ? 'male'
                                        : gender === 'Female'
                                            ? 'female'
                                            : 'male-female'
                                }
                                size={20}
                                color={selectedGender === gender ? '#FFF' : '#000'}
                            />
                            <Text
                                style={[
                                    styles.genderText,
                                    selectedGender === gender && styles.genderTextActive,
                                ]}
                            >
                                {gender}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Rental Date & Time */}
                <Text style={styles.sectionTitle}>Rental Date &Time</Text>
                <View style={styles.rentalTypeContainer}>
                    {rentalTypes.map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.rentalTypeButton,
                                selectedRentalType === type && styles.rentalTypeButtonActive,
                            ]}
                            onPress={() => setSelectedRentalType(type)}
                        >
                            <Text
                                style={[
                                    styles.rentalTypeText,
                                    selectedRentalType === type && styles.rentalTypeTextActive,
                                ]}
                            >
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Date Selection - Both fields open the same modal */}
                <View style={styles.dateContainer}>
                    <View style={styles.dateCard}>
                        <Text style={styles.dateLabel}>Pick up Date</Text>
                        <TouchableOpacity
                            style={styles.dateInputContainer}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
                            <Text style={styles.dateText}>{formatDate(pickupDate)}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dateCard}>
                        <Text style={styles.dateLabel}>Return Date</Text>
                        <TouchableOpacity
                            style={styles.dateInputContainer}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
                            <Text style={styles.dateText}>{formatDate(returnDate)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Car Location */}
                <Text style={styles.sectionTitle}>Car Location</Text>
                <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Shore Dr, Chicago 0062 Usa"
                        placeholderTextColor="#9CA3AF"
                        value={formData.location}
                        onChangeText={(text) => setFormData({ ...formData, location: text })}
                    />
                </View>

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View style={styles.bottomContainer}>
                <CustomButton
                    title="$1400   Pay Now"
                    onPress={handlePayNow}
                    variant="filled"
                    style={styles.payButton}
                />
            </View>

            {/* Single Date Time Picker Modal for both dates */}
            <DateTimePickerModal
                visible={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onConfirm={handleDateConfirm}
                startDate={pickupDate}
                endDate={returnDate}
                mode="range"
            />
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
    driverCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    driverCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    driverTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    driverSubtitle: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#000',
        paddingVertical: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
        marginTop: 8,
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    genderButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 30,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        gap: 8,
    },
    genderButtonActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    genderText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },
    genderTextActive: {
        color: '#FFF',
    },
    rentalTypeContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    rentalTypeButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 30,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
    },
    rentalTypeButtonActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    rentalTypeText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },
    rentalTypeTextActive: {
        color: '#FFF',
    },
    dateContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    dateCard: {
        flex: 1,
    },
    dateLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        gap: 8,
    },
    dateText: {
        fontSize: 13,
        color: '#6B7280',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#F0F0F0',
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
    payButton: {
        borderRadius: 30,
        marginBottom: 0,
    },
});
