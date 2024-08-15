import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    TextStyle,
    ViewStyle
} from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           title,
                                           onPress,
                                           loading = false,
                                           color = '#007BFF'
                                       }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={onPress}
            disabled={loading}
        >
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
                ) : (
                    <Text style={styles.buttonText}>{title}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 40,
        marginTop: 20,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    } as ViewStyle,
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    } as TextStyle,
    loader: {
        marginRight: 10,
    } as ViewStyle,
});

export default Button;
