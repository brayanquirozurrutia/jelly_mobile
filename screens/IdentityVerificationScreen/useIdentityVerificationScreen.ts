import {logout} from "../../api/auth";
import * as SecureStore from "expo-secure-store";
import {Alert} from "react-native";
import {IdentityVerificationScreenProps} from "./IdentityVerificationScreen.types";
import {useBoolean} from "../../hooks/useBoolean";

export const useIdentityVerificationScreen = (
    {
        navigation,
        route
    }: IdentityVerificationScreenProps
) => {
    const { userId } = route.params;

    const handleValidateIdentity = () => {
        navigation.navigate('CameraScreen', { userId });
    };

    const {
        state: loggingOut,
        setBooleanState: setLoggingOut,
    } = useBoolean(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await logout();
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');

            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar la sesión. Inténtalo de nuevo.');
        } finally {
            setLoggingOut(false);
        }
    };

    return {
        handleValidateIdentity,
        handleLogout,
        loggingOut,
    };
}
