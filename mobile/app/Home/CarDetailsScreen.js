import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';

const { width } = Dimensions.get('window');

export default function CarDetailsScreen() {
    const router = useRouter();
    const [activeSlide, setActiveSlide] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    // Car images for carousel
    const carImages = [
        require('../../assets/cars/car_1.png'),
        require('../../assets/cars/car_2.png'),
        require('../../assets/cars/car_3.png'),
    ];

    // Car features data
    const features = [
        {
            id: '1',
            icon: 'car-seat',
            label: 'Capacity',
            value: '5 Seats',
        },
        {
            id: '2',
            icon: 'engine-outline',
            label: 'Engine Out',
            value: '670 HP',
        },
        {
            id: '3',
            icon: 'speedometer',
            label: 'Max Speed',
            value: '250km/h',
        },
        {
            id: '4',
            icon: 'steering',
            label: 'Advance',
            value: 'Autopilot',
        },
        {
            id: '5',
            icon: 'ev-station',
            label: 'Single Charge',
            value: '405 Miles',
        },
        {
            id: '6',
            icon: 'parking',
            label: 'Advance',
            value: 'Auto Parking',
        },
    ];

    // Reviews data
    const reviews = [
        {
            id: '1',
            name: 'Mr. Jack',
            rating: 5.0,
            review: 'The rental car was clean, reliable, and the service was quick and efficient.',
            avatar: require('../../assets/images/profile.jpg'),
        },
        {
            id: '2',
            name: 'Robert',
            rating: 5.0,
            review: 'The rental car was clean, reliable, and the service was quick.',
            avatar: require('../../assets/images/profile.jpg'),
        },
    ];

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveSlide(viewableItems[0].index || 0);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const renderCarImage = ({ item }) => (
        <View style={styles.imageSlide}>
            <Image source={item} style={styles.carImage} resizeMode="contain" />
        </View>
    );

    const renderFeature = ({ item, index }) => (
        <View style={[styles.featureCard, index % 3 === 2 && styles.featureCardLast]}>
            <MaterialCommunityIcons name={item.icon} size={32} color="#666" />
            <Text style={styles.featureLabel}>{item.label}</Text>
            <Text style={styles.featureValue}>{item.value}</Text>
        </View>
    );

    const renderReview = ({ item }) => (
        <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <Image source={item.avatar} style={styles.reviewAvatar} />
                <View style={styles.reviewInfo}>
                    <Text style={styles.reviewName}>{item.name}</Text>
                </View>
                <View style={styles.reviewRating}>
                    <Text style={styles.reviewRatingText}>{item.rating}</Text>
                    <Ionicons name="star" size={16} color="#FFA500" />
                </View>
            </View>
            <Text style={styles.reviewText}>{item.review}</Text>
        </View>
    );

    const handleBookNow = () => {
        router.push(`/Home/BookingDetailsScreen`);
        // Navigate to booking screen
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Car Details</Text>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Image Carousel */}
                <View style={styles.carouselContainer}>
                    <FlatList
                        data={carImages}
                        renderItem={renderCarImage}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        keyExtractor={(_, index) => index.toString()}
                    />

                    {/* Favorite Button */}
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <Ionicons
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isFavorite ? '#FF0000' : '#000'}
                        />
                    </TouchableOpacity>

                    {/* Pagination Dots */}
                    <View style={styles.pagination}>
                        {carImages.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    index === activeSlide && styles.paginationDotActive,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* Car Info */}
                <View style={styles.infoContainer}>
                    <View style={styles.carInfoHeader}>
                        <View>
                            <Text style={styles.carName}>Tesla Model S</Text>
                            <Text style={styles.carDescription}>
                                A car with high specs that are rented ot an affordable price.
                            </Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>5.0</Text>
                            <Ionicons name="star" size={18} color="#FFA500" />
                            <Text style={styles.reviewsCount}>(100+Reviews)</Text>
                        </View>
                    </View>

                    {/* Book Now Button with Icon */}
                    <CustomButton
                        title="Book Now"
                        onPress={handleBookNow}
                        variant="filled"
                        icon={<Ionicons name="arrow-forward" size={20} color="#FFF" />}
                        iconPosition="right"
                        style={styles.bookButtonCustom}
                    />
                </View>

                {/* Owner Info */}
                <View style={styles.ownerContainer}>
                    <Image
                        source={require('../../assets/images/profile.jpg')}
                        style={styles.ownerAvatar}
                    />
                    <View style={styles.ownerInfo}>
                        <Text style={styles.ownerName}>Hela Quintin</Text>
                        <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color="#4A90E2"
                            style={styles.verifiedIcon}
                        />
                    </View>
                    <TouchableOpacity style={styles.contactButton}>
                        <Ionicons name="call-outline" size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton}>
                        <Ionicons name="chatbubble-outline" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Car Features */}
                <Text style={styles.sectionTitle}>Car features</Text>
                <FlatList
                    data={features}
                    renderItem={renderFeature}
                    numColumns={3}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.featuresRow}
                    keyExtractor={(item) => item.id}
                />

                {/* Reviews */}
                <View style={styles.reviewsHeader}>
                    <Text style={styles.sectionTitle}>Review (125)</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={reviews}
                    renderItem={renderReview}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.reviewsList}
                    keyExtractor={(item) => item.id}
                />

            </ScrollView>
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    carouselContainer: {
        height: 300,
        position: 'relative',
    },
    imageSlide: {
        width: width,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    carImage: {
        width: '90%',
        height: '90%',
    },
    favoriteButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    pagination: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D1D5DB',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#000',
        width: 24,
    },
    infoContainer: {
        padding: 20,
    },
    carInfoHeader: {
        marginBottom: 20,
    },
    carName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    carDescription: {
        fontSize: 14,
        color: '#9CA3AF',
        lineHeight: 20,
        marginBottom: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    ratingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 4,
    },
    reviewsCount: {
        fontSize: 14,
        color: '#9CA3AF',
        marginLeft: 8,
    },
    bookButtonCustom: {
        borderRadius: 30,
        marginBottom: 0,
    },
    ownerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F0F0F0',
    },
    ownerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    ownerInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ownerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginRight: 6,
    },
    verifiedIcon: {
        marginTop: 2,
    },
    contactButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        paddingHorizontal: 20,
        marginTop: 24,
        marginBottom: 16,
    },
    featuresRow: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    featureCard: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        padding: 16,
        marginRight: 12,
        alignItems: 'center',
    },
    featureCardLast: {
        marginRight: 0,
    },
    featureLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 8,
    },
    featureValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginTop: 4,
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    seeAllText: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    reviewsList: {
        paddingHorizontal: 20,
    },
    reviewCard: {
        width: 280,
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        marginRight: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    reviewAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    reviewInfo: {
        flex: 1,
    },
    reviewName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    reviewRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    reviewRatingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    reviewText: {
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 20,
    },
    bottomSpacer: {
        height: 40,
    },
});
