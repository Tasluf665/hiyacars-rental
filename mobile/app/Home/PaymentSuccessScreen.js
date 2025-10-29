import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import SuccessIcon from '../../components/SuccessIcon';

export default function PaymentSuccessScreen() {
    const router = useRouter();

    // Booking data
    const bookingData = {
        carModel: 'Tesla Model 3',
        rentalDate: '19Jan24 - 22Jan 24',
        name: 'Benjamin Jack',
    };

    // Transaction data
    const transactionData = {
        transactionId: '#T000123B0J1',
        transactionDate: '01Jan2024 - 10:30 am',
        paymentMethod: '123 *** *** ***225',
        amount: '$1400',
        serviceFee: '$15',
        tax: '$0',
        totalAmount: '$1415',
    };

    const handleDownloadReceipt = () => {
        console.log('Download receipt');
        // Implement receipt download logic
    };

    const handleShareReceipt = () => {
        console.log('Share receipt');
        // Implement share functionality
    };

    const handleBackToHome = () => {
        console.log('Back to home');
        router.push('/HomeScreen');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment States</Text>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Success Icon - Using SVG Component */}
                <View style={styles.successContainer}>
                    <SuccessIcon width={140} height={140} />
                    <Text style={styles.successTitle}>Payment successful</Text>
                    <Text style={styles.successSubtitle}>
                        Your car rent Booking has been successfully
                    </Text>
                </View>

                {/* Booking Information */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Booking information</Text>
                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Car Model</Text>
                        <Text style={styles.infoValue}>{bookingData.carModel}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Rental Date</Text>
                        <Text style={styles.infoValue}>{bookingData.rentalDate}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Name</Text>
                        <Text style={styles.infoValue}>{bookingData.name}</Text>
                    </View>
                </View>

                {/* Transaction Detail */}
                <Text style={styles.sectionTitle}>Transaction detail</Text>

                <View style={styles.transactionSection}>
                    <View style={styles.transactionRow}>
                        <Text style={styles.transactionLabel}>Transaction ID</Text>
                        <Text style={styles.transactionValue}>{transactionData.transactionId}</Text>
                    </View>

                    <View style={styles.transactionRow}>
                        <Text style={styles.transactionLabel}>Transaction Date</Text>
                        <Text style={styles.transactionValue}>{transactionData.transactionDate}</Text>
                    </View>

                    <View style={styles.transactionRow}>
                        <Text style={styles.transactionLabel}>Payment Method</Text>
                        <View style={styles.paymentMethodContainer}>
                            <View style={styles.mastercardLogo}>
                                <View style={[styles.circle, styles.circleRed]} />
                                <View style={[styles.circle, styles.circleOrange]} />
                            </View>
                            <Text style={styles.transactionValue}>{transactionData.paymentMethod}</Text>
                        </View>
                    </View>

                    <View style={styles.dividerFull} />

                    <View style={styles.transactionRow}>
                        <Text style={styles.transactionLabel}>Amount</Text>
                        <Text style={styles.transactionValue}>{transactionData.amount}</Text>
                    </View>

                    <View style={styles.transactionRow}>
                        <Text style={styles.transactionLabel}>Service fee</Text>
                        <Text style={styles.transactionValue}>{transactionData.serviceFee}</Text>
                    </View>

                    <View style={styles.transactionRow}>
                        <Text style={styles.transactionLabel}>Tax</Text>
                        <Text style={styles.transactionValue}>{transactionData.tax}</Text>
                    </View>

                    <View style={styles.dividerFull} />

                    <View style={styles.transactionRow}>
                        <Text style={styles.totalLabel}>Total amount</Text>
                        <Text style={styles.totalValue}>{transactionData.totalAmount}</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity style={styles.actionButton} onPress={handleDownloadReceipt}>
                    <Ionicons name="download-outline" size={20} color="#6B7280" />
                    <Text style={styles.actionButtonText}>Download Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={handleShareReceipt}>
                    <Ionicons name="share-social-outline" size={20} color="#6B7280" />
                    <Text style={styles.actionButtonText}>Share Your Receipt</Text>
                </TouchableOpacity>

                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View style={styles.bottomContainer}>
                <CustomButton
                    title="Back to Home"
                    onPress={handleBackToHome}
                    variant="filled"
                    style={styles.homeButton}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    successContainer: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    successTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 24,
        marginBottom: 8,
    },
    successSubtitle: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoLabel: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    infoValue: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    transactionSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    transactionLabel: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    transactionValue: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    mastercardLogo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    circleRed: {
        backgroundColor: '#EB001B',
    },
    circleOrange: {
        backgroundColor: '#FF5F00',
        marginLeft: -6,
    },
    dividerFull: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 8,
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
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        gap: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    actionButtonText: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
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
    homeButton: {
        borderRadius: 30,
        marginBottom: 0,
    },
});
