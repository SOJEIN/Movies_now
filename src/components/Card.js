import React from 'react'
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import PropTypes from "prop-types"

const plaveHolderImage = require("../assets/images/placeholder.png");
const propTypes = {
    item: PropTypes.object,
}

class Card extends React.PureComponent {
    render() {
        const { navigation, item } = this.props;
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Detalles', { movieDetail: item.id })}
                style={
                    styles.container
                }>
                <Image
                    style={styles.imagen}
                    resizeMode="cover"
                    source={item.poster_path
                        ? { uri: `https://image.tmdb.org/t/p/w500` + item.poster_path }
                        : plaveHolderImage
                    }
                />{
                    !item.poster_path && (
                        <Text style={styles.movieTitle}>{item.title}</Text>
                    )
                }
            </TouchableOpacity>
        );
    }
}

Card.propTypes = propTypes;

export default Card;

const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: "relative",
        alignItems: "center",
        height: 200
    },

    imagen: {
        height: 200,
        width: 120,
        borderRadius: 20,
    },

    movieTitle: {
        position: "absolute",
        width: 100,
        textAlign: "center",
        alignSelf: "center",
        top: 10,
    }
})