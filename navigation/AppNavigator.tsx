import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import IdentityVerificationScreen from '../screens/IdentityVerificationScreen/IdentityVerificationScreen';
import CameraScreen from "../screens/CameraScreen";
import HomeScreen from '../screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';

export type RootStackParamList = {
    Login: undefined;
    IdentityVerification: { userId: string };
    CameraScreen: { userId: string };
    Home: undefined;
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
                <Stack.Screen
                    name="IdentityVerification"
                    component={IdentityVerificationScreen}
                    options={{ title: 'Verificación de Identidad' }}
                    initialParams={{ userId: '' }}
                />
                <Stack.Screen
                    name="CameraScreen"
                    component={CameraScreen}
                    options={{ title: 'Captura de Identidad' }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Inicio' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
