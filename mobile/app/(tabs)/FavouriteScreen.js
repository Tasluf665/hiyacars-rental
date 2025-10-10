import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FavouriteScreen() {
    return (
        <View style={styles.container}>
            <Text>FavouriteScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})