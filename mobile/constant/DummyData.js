export const cars = [
    {
        id: '1',
        name: 'Ferrari-FF',
        location: 'Washington DC',
        seats: 4,
        price: 'dhs.200/Day',
        image: require('../assets/cars/car_1.png'),
        isFavorite: false,
    },
    {
        id: '2',
        name: 'Tesla Model S',
        location: 'Chicago, USA',
        seats: 5,
        price: 'dhs.100/Day',
        image: require('../assets/cars/car_2.png'),
        isFavorite: false,
    },
    {
        id: '3',
        name: 'BMW GTS3 M2',
        location: 'New York, USA',
        seats: 4,
        rating: 5.0,
        price: '$100/Day',
        image: require('../assets/cars/car_3.png'),
        isFavorite: false,
    },
    {
        id: '4',
        name: 'Lamborghini Aventador',
        location: 'Washington DC',
        seats: 2,
        rating: 4.9,
        price: '$100/Day',
        image: require('../assets/cars/car_4.png'),
        isFavorite: false,
    },
]


export const categories = [
    { id: '1', name: 'Sedan', image: require('../assets/cars/car_1.png') },
    { id: '2', name: 'Hatchback', image: require('../assets/cars/car_2.png') },
    { id: '3', name: 'SUV', image: require('../assets/cars/car_3.png') },
    { id: '4', name: 'Luxury', image: require('../assets/cars/car_4.png') },
];


// Nearby cars data
export const nearbyCars = [
    {
        id: '1',
        name: 'BMW M8',
        image: require('../assets/cars/car_1.png'),
    },
];