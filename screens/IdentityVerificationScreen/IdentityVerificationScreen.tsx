import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from './IdentityVerificationScreenStyles';
import Button from '../../components/Button';
import { IdentityVerificationScreenProps } from './IdentityVerificationScreen.types';
import {useIdentityVerificationScreen} from "./useIdentityVerificationScreen";
import LoadingModal from "../../components/LoadingModal";

const IdentityVerificationScreen: React.FC<IdentityVerificationScreenProps> = (
    {
        navigation,
        route
    }) => {

    const {
        handleValidateIdentity,
        handleLogout,
        loggingOut,
    } = useIdentityVerificationScreen(
        {
            navigation,
            route
        });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Verificación de Identidad Requerida</Text>
                <Text style={styles.message}>
                    Tu identidad no ha sido verificada. Por favor, verifica tu identidad para continuar usando la aplicación.
                </Text>
                <View style={styles.buttonContainer}>
                    <Button title="Verificar Identidad" onPress={handleValidateIdentity} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.textLink}>Salir</Text>
                    </TouchableOpacity>
                </View>
                {loggingOut && (
                    <LoadingModal
                        visible={loggingOut}
                        message="Cerrando sesión..."
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default IdentityVerificationScreen;
