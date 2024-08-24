import React from 'react';
import { View, Text, SafeAreaView, Alert, Image, TouchableOpacity, Linking } from 'react-native';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { styles } from './LoginScreenStyles';
import { useLogin } from './useLogin';

const LoginScreen: React.FC = () => {
    const {
        emailField,
        passwordField,
        loading,
        handleLogin,
    } = useLogin();

    const openGitHub = () => {
        Linking.openURL('https://github.com/brayanquirozurrutia').then(r => r);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Image
                    source={{ uri: 'https://res.cloudinary.com/tecitostore/image/upload/v1719678497/Assets/logo.png' }}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Tecito intercambios</Text>
                <InputField
                    label="Correo"
                    value={emailField.value}
                    onChangeText={emailField.onChange}
                    error={emailField.error}
                    required={true}
                />
                <InputField
                    label="Contraseña"
                    value={passwordField.value}
                    onChangeText={passwordField.onChange}
                    secureTextEntry
                    error={passwordField.error}
                    required={true}
                />
                <Button
                    title="Iniciar sesión"
                    onPress={handleLogin}
                    loading={loading}
                />
                <View style={styles.linkContainer}>
                    <TouchableOpacity onPress={() => Alert.alert('Crear Cuenta', 'Navegar a pantalla de registro')}>
                        <Text style={styles.linkText}>Crear cuenta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert('Olvidaste tu contraseña', 'Navegar a pantalla de recuperación')}>
                        <Text style={styles.linkText}>Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={openGitHub} style={styles.footerContent}>
                        <Animatable.View animation="pulse" iterationCount="infinite" style={styles.heartIcon}>
                            <Icon name="heart" size={24} color="red" />
                        </Animatable.View>
                        <Text style={styles.footerText}>
                            Powered by <Text style={styles.footerTextBold}>Brayan Quiroz Urrutia</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
