import {useCameraPermissions} from 'expo-camera';
import React, {useRef, useState} from 'react';
import {Alert, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Camera, CameraType, FlashMode} from "expo-camera/legacy";
import {verifyIdentity} from "../../api/auth";

/*
* TODO: MEJORAR LA PANTALLA DE LA CÁMARA
*  - Agregar un botón para cambiar el flash
* - Agregar un botón para cambiar la relación de aspecto
* - Agregar un botón para cambiar la calidad de la imagen
* - Agregar un botón para cambiar el tamaño de la imagen
* - Separar hoos de la lógica de la pantalla
 */


const CameraScreen: React.FC = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [type, setType] = useState<CameraType>(CameraType.back);
    const [flash, setFlash] = useState<FlashMode>(FlashMode.auto);
    const [capturing, setCapturing] = useState<number>(0);
    const [frontIdImage, setFrontIdImage] = useState<string | null>(null);
    const [backIdImage, setBackIdImage] = useState<string | null>(null);
    const cameraRef = useRef<Camera>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    }

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const photoData = await cameraRef.current.takePictureAsync();
            const { uri } = photoData;

            if (uri) {
                if (capturing === 0) {
                    setFrontIdImage(uri);
                    setCapturing(1);
                } else if (capturing === 1) {
                    setBackIdImage(uri);
                    setCapturing(2);
                } else if (capturing === 2) {
                    setCapturing(0);
                    await sendImages(uri);
                }
            }
        }
    };

    const sendImages = async (faceImageUri: string) => {
        try {
            if (frontIdImage && backIdImage) {
                const response = await verifyIdentity(
                    frontIdImage,
                    backIdImage,
                    faceImageUri,
                );
                console.log(response);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Login Failed', 'Oops! Algo salió mal.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Camera
                type={type}
                ratio={'16:9'}
                style={styles.camera}
                flashMode={flash}
                ref={cameraRef}
                autoFocus={true}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: 'white',
    },
    camera: {
        width: '100%',
        height: Dimensions.get('window').width * 16 / 9,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '100%',
        padding: 20,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default CameraScreen;
