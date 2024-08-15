import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { StatusBar } from 'expo-status-bar'; // Usa expo-status-bar

type RootStackParamList = {
    Login: undefined;
    // Agrega más pantallas aquí si las tienes
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: 'Login' }}
                />
                {/* Agrega más pantallas aquí en el futuro */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
