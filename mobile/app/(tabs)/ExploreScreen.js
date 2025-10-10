import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ExploreScreen() {
    return (
        <View style={styles.container}>
            <Text>ExploreScreen</Text>
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