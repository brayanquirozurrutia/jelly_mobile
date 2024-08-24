import {useCameraPermissions} from "expo-camera";
import {useEffect, useRef, useState} from "react";
import {Camera, CameraType, FlashMode} from "expo-camera/legacy";
import * as ImagePicker from "expo-image-picker";
import {Alert, Image, Linking} from "react-native";
import {verifyIdentity} from "../../api/auth";
import {useBoolean} from "../../hooks/useBoolean";
import {useInteger} from "../../hooks/useInteger";
import {useStringOrNull} from "../../hooks/useStringOrNull";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const useCameraScreen = (userId: string) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [type, setType] = useState<CameraType>(CameraType.back);
    const [flash, setFlash] = useState<FlashMode>(FlashMode.auto);
    const cameraRef = useRef<Camera>(null);

    const navigation = useNavigation<NavigationProp>();

    const {
        state: imagePickerPermission,
        setBooleanState: setImagePickerPermission
    } = useBoolean(false);

    const {
        state: showPermissionModal,
        setBooleanState: setShowPermissionModal
    } = useBoolean(false);

    const {
        state: loading,
        setBooleanState: setLoading
    } = useBoolean(false);

    const {
        state: isSuccessModalVisible,
        setBooleanState: setIsSuccessModalVisible
    } = useBoolean(false);

    const {
        value: capturing,
        setValue: setCapturing
    } = useInteger(0);

    const {
        value: frontIdImage,
        setValue: setFrontIdImage
    } = useStringOrNull(null);

    const {
        value: backIdImage,
        setValue: setBackIdImage
    } = useStringOrNull(null);

    const {
        value: faceImage,
        setValue: setFaceImage
    } = useStringOrNull(null);

    const {
        value: previewImage,
        setValue: setPreviewImage
    } = useStringOrNull(null);

    const imageLabels = [
        "Cédua Frontal",
        "Cédula Trasera",
        "Rostro"
    ];

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setImagePickerPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if (faceImage) {
            sendImages().then(r => r);
        }
    }, [faceImage]);

    useEffect(() => {
        if (!permission || !imagePickerPermission) {
            checkPermissions().then(r => r);
        }
    }, [permission, imagePickerPermission]);

    const checkPermissions = async () => {
        const cameraStatus = await Camera.getCameraPermissionsAsync();
        const mediaStatus = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
            setShowPermissionModal(true);
        }
    };

    const handlePermissionRequest = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            setShowPermissionModal(false);
        } else {
            setShowPermissionModal(true);
        }
    };

    const handleImagePickerPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setImagePickerPermission(status === 'granted');
    };

    const openSettings = () => {
        Linking.openSettings().then(r => r);
    };

    const toggleCameraFacing = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    }

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            try {
                const photoData = await cameraRef.current.takePictureAsync(
                    {
                        quality: 1,
                        skipProcessing: true,
                    }
                );

                Image.getSize(photoData.uri, (width, height) => {
                    setPreviewImage(photoData.uri);
                }, (error) => {
                    Alert.alert('Error', 'Ocurrió un error al capturar la imagen');
                });
            } catch (error) {
                Alert.alert('Error', 'Ocurrió un error al capturar la imagen');
            }
        } else {
            Alert.alert('Error', 'No se pudo acceder a la cámara');
        }
    };

    const handleSelectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
            if (!result.canceled && result.assets && result.assets.length > 0) {
                setPreviewImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
        }
    };

    const confirmPicture = () => {
        if (previewImage) {
            if (capturing === 0) {
                setFrontIdImage(previewImage);
                setCapturing(1);
            } else if (capturing === 1) {
                setBackIdImage(previewImage);
                setCapturing(2);
            } else if (capturing === 2) {
                setFaceImage(previewImage);
            }
            setPreviewImage(null);
        }
    };

    const retakePicture = () => {
        setPreviewImage(null);
    };

    const sendImages = async () => {
        try {
            if (frontIdImage && backIdImage && faceImage) {
                setLoading(true);
                const response = await verifyIdentity(
                    frontIdImage,
                    backIdImage,
                    faceImage,
                    userId
                );
                setIsSuccessModalVisible(true);
            } else {
                Alert.alert('Error en la Verificación', 'Por favor, asegúrate de tomar las tres fotos necesarias.');
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error en la Verificación', 'Oops! Algo salió mal.');
            }
        } finally {
            setFrontIdImage(null);
            setBackIdImage(null);
            setFaceImage(null);
            setCapturing(0);
            setLoading(false);
        }
    };

    const handleSuccessModalClose = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    return {
        permission,
        imagePickerPermission,
        type,
        flash,
        capturing,
        loading,
        previewImage,
        cameraRef,
        imageLabels,
        requestPermission: handlePermissionRequest,
        setImagePickerPermission,
        toggleCameraFacing,
        handleTakePicture,
        retakePicture,
        confirmPicture,
        handleSelectImage,
        isSuccessModalVisible,
        setIsSuccessModalVisible,
        openSettings,
        showPermissionModal,
        setShowPermissionModal,
        handleSuccessModalClose
    };
}
