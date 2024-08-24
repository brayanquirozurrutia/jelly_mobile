import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 20,
    },
    innerContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: colors.text,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
    textLink: {
        color: colors.link,
        fontSize: 16,
    }
});

export default styles;
