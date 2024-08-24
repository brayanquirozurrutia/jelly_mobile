import {Dimensions, StyleSheet} from "react-native";

export const cameraScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
    infoContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    imageLabel: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    previewImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 16 / 9,
        resizeMode: 'contain',
        zIndex: 1,
    },
    previewButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    topButtonContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 10,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 10,
        borderRadius: 5,
    },
});
