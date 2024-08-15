import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    linkContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        fontSize: 16,
        color: '#007BFF',
        marginVertical: 5,
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerTextBold: {
        fontWeight: 'bold',
    },
    heartIcon: {
        marginRight: 10,
    },
    footerText: {
        fontSize: 14,
        color: 'black',
    },
});
