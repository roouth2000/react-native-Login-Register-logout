import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the necessary navigation package


const SplashScreen = () => {
    const navigation = useNavigation(); // Get the navigation object using useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login'); // Navigate to the 'Home' screen after 3000 milliseconds
        }, 1000);
    }, [navigation]); // Add navigation as a dependency to useEffect()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4169e1',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 100,
        color: "#fff"
    }
});
