import React from 'react';
import {
    Button,
    Text,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import { Camera} from "expo-camera/legacy";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useCameraScreen} from "./useCameraScreen";
import SuccessModal from "../../components/SuccessModal";
import { cameraScreenStyles as styles } from "./CameraScreenStyles";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/AppNavigator";

type CameraScreenRouteProp = RouteProp<RootStackParamList, 'CameraScreen'>;

interface CameraScreenProps {
    route: CameraScreenRouteProp;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ route }) => {
    const { userId } = route.params;

    const {
        permission,
        imagePickerPermission,
        type,
        flash,
        capturing,
        loading,
        previewImage,
        cameraRef,
        imageLabels,
        showPermissionModal,
        requestPermission,
        setImagePickerPermission,
        toggleCameraFacing,
        handleTakePicture,
        retakePicture,
        confirmPicture,
        handleSelectImage,
        isSuccessModalVisible,
        setIsSuccessModalVisible,
        openSettings,
        setShowPermissionModal,
        handleSuccessModalClose
    } = useCameraScreen(userId);

    const cameraPermissionGranted = permission?.granted ?? false;
    const mediaLibraryPermissionGranted = imagePickerPermission ?? false;

    if (!cameraPermissionGranted || !mediaLibraryPermissionGranted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Para continuar, necesitas otorgar permisos de cámara y galería.</Text>
                <Button onPress={requestPermission} title="Dar Permiso de Cámara" />
                <Button onPress={async () => {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    setImagePickerPermission(status === 'granted');
                }} title="Dar Permiso de Galería" />
                {showPermissionModal && (
                    <SuccessModal
                        visible={showPermissionModal}
                        onClose={() => setShowPermissionModal(false)}
                        textBody="No tienes acceso a la cámara o galería. Por favor, ve a los ajustes y habilita el acceso."
                        buttonText="Ir a Ajustes"
                        onButtonPress={openSettings}
                    />
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SuccessModal
                visible={isSuccessModalVisible}
                onClose={() => setIsSuccessModalVisible(false)}
                textBody="¡Validación exitosa!"
                onSuccess={handleSuccessModalClose}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : previewImage ? (
                <View style={styles.previewContainer}>
                    <View style={styles.topButtonContainer}>
                        <TouchableOpacity style={styles.iconButton} onPress={handleSelectImage}>
                            <Ionicons name="images-outline" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={{ uri: previewImage }}
                        style={styles.previewImage}
                        resizeMode="contain"
                    />
                    <View style={styles.previewButtonContainer}>
                        <TouchableOpacity style={styles.button} onPress={retakePicture}>
                            <Text style={styles.text}>Retomar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={confirmPicture}>
                            <Text style={styles.text}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Camera
                    type={type}
                    ratio={'16:9'}
                    style={styles.camera}
                    flashMode={flash}
                    ref={cameraRef}
                    autoFocus={true}
                >
                    <View style={styles.infoContainer}>
                        <Text style={styles.imageLabel}>{imageLabels[capturing]}</Text>
                    </View>
                    <View style={styles.bottomButtonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Girar Cámara</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                            <Text style={styles.text}>Tomar Foto</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    );
};

export default CameraScreen;
