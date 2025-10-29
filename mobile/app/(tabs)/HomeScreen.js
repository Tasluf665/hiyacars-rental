import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constant/Colors';
import CarCard from '../../components/CarCard';
import { cars, categories, nearbyCars } from '../../constant/DummyData';



export default function HomeScreen() {
    const [selectedCategory, setSelectedCategory] = useState('Sedan');
    const [availableCars, setAvailableCars] = useState(cars);

    const handleFavoritePress = (carId) => {
        setAvailableCars(prevCars =>
            prevCars.map(car =>
                car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car
            )
        );
    };

    const handleBookPress = (car) => {
        console.log('Book pressed for:', car.name);
        // Navigate to booking screen or show booking modal
    };

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => setSelectedCategory(item.name)}
        >
            <View
                style={[
                    styles.categoryImageContainer,
                    selectedCategory === item.name && styles.selectedCategory,
                ]}
            >
                <Image source={item.image} style={styles.categoryImage} resizeMode="contain" />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderCarCard = ({ item, index }) => (
        <CarCard
            item={item}
            index={index}
            onFavoritePress={handleFavoritePress}
            onBookPress={handleBookPress}
        />
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/icons/car_icon_2.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.notificationButton}>
                            <Ionicons name="notifications-outline" size={24} color="#000" />
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileButton}>
                            <Image
                                source={require('../../assets/images/profile.jpg')}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Feather name="search" size={20} color="#999" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search your dream car...."
                            placeholderTextColor="#999"
                        />
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Feather name="sliders" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* What are you looking for? */}
                <Text style={styles.sectionTitle}>What are you looking for?</Text>

                {/* Categories - Horizontal Scroll */}
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                />

                {/* Available Cars */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Available Cars</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                {/* Cars Grid */}
                <FlatList
                    data={availableCars}
                    renderItem={renderCarCard}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.carRow}
                />

                {/* Nearby Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Nearby</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                {/* Nearby Car */}
                <View style={styles.nearbyCard}>
                    <Image
                        source={require('../../assets/cars/car_1.png')}
                        style={styles.nearbyImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Bottom Spacing for Tab Bar */}
                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: Colors.Border,
    },
    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    notificationButton: {
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 12,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 7,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    filterButton: {
        width: 52,
        height: 52,
        backgroundColor: '#F5F5F5',
        borderRadius: 25.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 16,
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        gap: 16,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 16,
    },
    categoryImageContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    selectedCategory: {
        backgroundColor: '#D0D0D0',
        borderWidth: 2,
        borderColor: '#000',
    },
    categoryImage: {
        width: 50,
        height: 50,
    },
    categoryText: {
        fontSize: 12,
        color: '#000',
        fontWeight: '500',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingLeft: 0,
        marginTop: 20,
        marginBottom: 7,
    },
    viewAllText: {
        fontSize: 14,
        color: '#666',
    },
    carRow: {
        paddingHorizontal: 20,
        gap: 12,
    },
    nearbyCard: {
        marginHorizontal: 20,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
    },
    nearbyImage: {
        width: '100%',
        height: 150,
    },
    bottomSpacer: {
        height: 20,
    },
});
