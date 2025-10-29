import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CarCard = ({ item, index, onFavoritePress, onBookPress }) => {
    return (
        <View style={[styles.carCard, index % 2 === 0 ? styles.carCardLeft : styles.carCardRight]}>
            {/* Content Container */}
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => onFavoritePress && onFavoritePress(item.id)}
                >
                    <Ionicons
                        name={item.isFavorite ? 'heart' : 'heart-outline'}
                        size={20}
                        color={item.isFavorite ? '#FF0000' : '#000'}
                    />
                </TouchableOpacity>

                <Image source={item.image} style={styles.carImage} resizeMode="contain" />

                <Text style={styles.carName}>{item.name}</Text>

                {item.rating && (
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>{item.rating}</Text>
                        <Ionicons name="star" size={14} color="#FFA500" />
                    </View>
                )}

                <View style={styles.carDetails}>
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text style={styles.location}>{item.location}</Text>
                </View>

                <View style={styles.carFooter}>
                    <View style={styles.seatsContainer}>
                        <Ionicons name="person-outline" size={14} color="#666" />
                        <Text style={styles.seats}>{item.seats} Seats</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Ionicons name="pricetag-outline" size={14} color="#666" />
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                </View>
            </View>

            {/* Book Button - Fixed at Bottom */}
            <TouchableOpacity
                style={styles.bookButton}
                onPress={() => onBookPress && onBookPress(item)}
            >
                <Text style={styles.bookButtonText}>Book now</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    carCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        position: 'relative',
        justifyContent: 'space-between',
    },
    carCardLeft: {
        marginRight: 6,
    },
    carCardRight: {
        marginLeft: 6,
    },
    contentContainer: {
        flex: 1,
    },
    favoriteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 6,
    },
    carImage: {
        width: '100%',
        height: 100,
        marginBottom: 8,
    },
    carName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    rating: {
        fontSize: 12,
        color: '#000',
        fontWeight: '500',
    },
    carDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    location: {
        fontSize: 12,
        color: '#666',
    },
    carFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    seatsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    seats: {
        fontSize: 12,
        color: '#666',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    price: {
        fontSize: 12,
        color: '#666',
    },
    bookButton: {
        backgroundColor: '#2C3333',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 'auto',
    },
    bookButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default CarCard;
