import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { getPopularMovies, getUpcomingMovies } from "../services/services"
import { SliderBox } from "react-native-image-slider-box";

const dimensions = Dimensions.get('screen');
const Home = () => {
    const [movieImagenes, setMovieImagenes] = useState("");
    const [error, seterror] = useState(false);

    useEffect(() => {
        getUpcomingMovies()
            .then(movies => {
                const movieImagenesArray = [];
                movies.forEach(movie => {
                    movieImagenesArray.push(`https://image.tmdb.org/t/p/w500` + movie.poster_path)
                });
                setMovieImagenes(movieImagenesArray);
            }).catch(err => {
                seterror(err);
            });
        getPopularMovies()
            .then(movies => {
            }).catch(err => {
                seterror(err);
            });
    }, [])
    return (
        <View style={styles.sliderContainer}>
            <SliderBox
                images={movieImagenes}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimensions.height / 1.5}
                dotStyle={styles.slider} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    error: {
        color: "red",
    },

    sliderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },

    slider: {
        height: 0
    }
})
