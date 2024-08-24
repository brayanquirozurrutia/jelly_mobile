import React from 'react';
import { Modal, View, Text} from 'react-native';
import Button from './Button';
import styles from '../theme/styles';

interface SuccessModalProps {
    visible: boolean;
    onClose: () => void;
    textBody: string;
    buttonText?: string;
    onButtonPress?: () => void;
    onSuccess?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = (
    {
        visible,
        onClose,
        textBody,
        buttonText = 'Cerrar',
        onButtonPress,
        onSuccess
    }) => {

    const handleClose = () => {
        if (onSuccess) {
            onSuccess();
        }
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{textBody}</Text>
                    <Button
                        title={buttonText}
                        onPress={onButtonPress ? onButtonPress : handleClose}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default SuccessModal;
