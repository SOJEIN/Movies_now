import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import { getPopularMovies, getUpcomingMovies, getPopularTv } from "../services/services"
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';

const dimensions = Dimensions.get('screen');
const Home = () => {
    const [movieImagenes, setMovieImagenes] = useState("");
    const [popularMovies, setPopularMovies] = useState("");
    const [popularTv, setPopularTv] = useState("");
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
                setPopularMovies(movies)
            }).catch(err => {
                seterror(err);
            });
        getPopularTv()
            .then(movies => {
                setPopularTv(movies)
            }).catch(err => {
                seterror(err);
            });
    }, [])
    return (
        <>
            <ScrollView>
                <View style={styles.sliderContainer}>
                    <SliderBox
                        images={movieImagenes}
                        autoplay={true}
                        circleLoop={true}
                        sliderBoxHeight={dimensions.height / 1.5}
                        dotStyle={styles.slider} />
                </View>
                <View style={styles.carousel}>
                    <List
                        title={"Peliculas populares"}
                        content={popularMovies}
                    />
                </View>
                <View style={styles.carousel}>
                    <List
                        title={"Series populares tv"}
                        content={popularTv}
                    />
                </View>
            </ScrollView>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    slider: {
        height: 0
    },

    carousel: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
