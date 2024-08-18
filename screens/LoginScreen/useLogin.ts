import { validateEmail, validatePassword } from '../../utils/validation';
import { Alert } from 'react-native';
import {login} from "../../api/auth";
import {useLoading} from "../../hooks/useLoading";
import {useString} from "../../hooks/useString";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const useLogin = () => {

    const emailField = useString('');
    const passwordField = useString('');
    const { loading, setLoadingState } = useLoading();
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

            if (!response.verified_identity) {
                navigation.navigate('IdentityVerification');
            } else {
                Alert.alert('Login Success', 'You are logged in!');
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
