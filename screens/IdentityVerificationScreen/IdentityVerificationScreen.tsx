import React from 'react';
import { View, Text, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import styles from './IdentityVerificationScreenStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

// Tipar las props del componente con la navegación
type IdentityVerificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'IdentityVerification'>;

interface IdentityVerificationScreenProps {
    navigation: IdentityVerificationScreenNavigationProp;
}

const IdentityVerificationScreen: React.FC<IdentityVerificationScreenProps> = ({ navigation }) => {
    const handleValidateIdentity = () => {
        navigation.navigate('CameraScreen'); // Navega a la pantalla de la cámara
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Verificación de Identidad Requerida</Text>
                <Text style={styles.message}>
                    Tu identidad no ha sido verificada. Por favor, verifica tu identidad para continuar usando la aplicación.
                </Text>
                <View style={styles.buttonContainer}>
                    <Button title="Volver a Intentar" onPress={() => {/* Navegar a la pantalla de login */}} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Validar Identidad" onPress={handleValidateIdentity} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default IdentityVerificationScreen;
