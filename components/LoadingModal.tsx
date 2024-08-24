import React from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';
import styles from '../theme/styles';
import colors from "../theme/colors";

interface LoadingModalProps {
    visible: boolean;
    message: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible, message }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <ActivityIndicator size="large" color={colors.loadingAnimation} />
                    <Text style={styles.modalText}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};

export default LoadingModal;
