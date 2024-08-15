import React from 'react';
import { TextInput as PaperInput, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import colors from '../theme/colors';

interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    error?: string | null;
    onBlur?: () => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   value,
                                                   onChangeText,
                                                   secureTextEntry,
                                                   error,
                                                   onBlur,
                                                   required
                                               }) => {
    return (
        <View style={styles.container}>
            <PaperInput
                label={required ? `${label} *` : label}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                mode="outlined"
                style={styles.input}
                placeholder={`Ingresa tu ${label.toLowerCase()}`}
                outlineColor={error ? colors.error : colors.purple}
                activeOutlineColor={error ? colors.error : colors.purple2}
                theme={{ colors: { error: colors.error } }}
                onBlur={onBlur}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    input: {
        backgroundColor: '#fff',
        marginTop: 5,
    },
    errorText: {
        color: colors.error,
        marginTop: 5,
        fontSize: 12,
    },
});

export default InputField;
