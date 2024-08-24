import { validateEmail, validatePassword } from '../../utils/validation';
import { Alert } from 'react-native';
import {login} from "../../api/auth";
import {useBoolean} from "../../hooks/useBoolean";
import {useString} from "../../hooks/useString";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import * as SecureStore from 'expo-secure-store';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const useLogin = () => {

    const emailField = useString('');
    const passwordField = useString('');
    const {
        state: loading,
        setBooleanState: setLoadingState,
    } = useBoolean();

    const navigation = useNavigation<NavigationProp>();

    const handleLogin = async () => {
        emailField.setError(null);
        passwordField.setError(null);

        if (!emailField.value) {
            emailField.setError('El correo es obligatorio.');
            return
        } else if (!validateEmail(emailField.value)) {
            emailField.setError('Por favor ingresa un correo válido.');
            return
        }

        if (!passwordField.value) {
            passwordField.setError('La contraseña es obligatoria.');
            return
        } else if (!validatePassword(passwordField.value)) {
            passwordField.setError('La contraseña no cumple con los requisitos.');
            return
        }

        if (emailField.error || passwordField.error) {
            Alert.alert('Error', 'Por favor revisa los campos.');
            return;
        }

        setLoadingState(true);

        try {
            const response = await login({
                email: emailField.value,
                password: passwordField.value
            });

            await SecureStore.setItemAsync('accessToken', response.access_token);
            await SecureStore.setItemAsync('refreshToken', response.refresh_token);
            await SecureStore.setItemAsync('userId', response.id.toString());

            if (!response.verified_identity) {
                navigation.navigate('IdentityVerification', { userId: response.id });
            } else {
                navigation.navigate('Home');
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Login Failed', 'Oops! Algo salió mal.');
            }
        } finally {
            setLoadingState(false);
        }
    };

    return {
        emailField,
        passwordField,
        loading,
        handleLogin,
    };
};
