import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from "prop-types";

const propTypes = {
    errorText: PropTypes.string,
    errorText2: PropTypes.string,
}

const defaultProps = {
    errorText: "Huy! Algo salió mal.",
    errorText2: "Asegúrate de estar en línea y restaurar la aplicación"
}



class Error extends React.PureComponent {
    render() {
        const { errorText, errorText2 } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {errorText}
                </Text>
                <Text style={styles.text}>
                    {errorText2}
                </Text>
            </View>
        );
    }
}

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    text: {
        fontWeight: "bold",
    }

})