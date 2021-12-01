import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentaryMovies } from "../services/services"
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');
const Home = ({ navigation }) => {
    const [movieImagenes, setMovieImagenes] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [popularTv, setPopularTv] = useState();
    const [familyMovies, setFamilyMovies] = useState();
    const [documentaryMovies, setDocumentaryMovies] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getPopularTv(),
            getFamilyMovies(),
            getDocumentaryMovies(),
        ])
    };

    console.log("api", popularMovies)

    useEffect(() => {
        getData()
            .then(
                ([
                    upcomingMoviesData,
                    popularMoviesData,
                    popularTvData,
                    familyMoviesData,
                    documentaryMoviesData
                ]) => {
                    const movieImagenesArray = [];
                    upcomingMoviesData.forEach(movie => {
                        movieImagenesArray.push(`https://image.tmdb.org/t/p/w500` + movie.poster_path);
                    });
                    setMovieImagenes(movieImagenesArray);
                    setPopularMovies(popularMoviesData);
                    setPopularTv(popularTvData);
                    setFamilyMovies(familyMoviesData);
                    setDocumentaryMovies(documentaryMoviesData);
                }).catch(() => {
                    setError(true);
                }).finally(() => {
                    setLoading(true);
                })
    }, [])
    return (
        <>
            {loading && !error && (
                <ScrollView>
                    {
                        movieImagenes && (
                            <View style={styles.sliderContainer}>
                                <SliderBox
                                    images={movieImagenes}
                                    autoplay={true}
                                    circleLoop={true}
                                    sliderBoxHeight={dimensions.height / 1.5}
                                    dotStyle={styles.slider} />
                            </View>
                        )}
                    {
                        popularMovies && (
                            <View style={styles.carousel}>
                                <List
                                    navigation={navigation}
                                    title={"Peliculas populares"}
                                    content={popularMovies}
                                />
                            </View>
                        )
                    }
                    {
                        popularTv && (
                            <View style={styles.carousel}>
                                <List
                                    navigation={navigation}
                                    title={"Series populares tv"}
                                    content={popularTv}
                                />
                            </View>
                        )
                    }
                    {
                        familyMovies && (
                            <View style={styles.carousel}>
                                <List
                                    navigation={navigation}
                                    title={"Series Familiares"}
                                    content={familyMovies}
                                />
                            </View>
                        )
                    }
                    {
                        documentaryMovies && (
                            <View style={styles.carousel}>
                                <List
                                    navigation={navigation}
                                    title={"Documentales"}
                                    content={documentaryMovies}
                                />
                            </View>
                        )
                    }
                </ScrollView>
            )}
            {!loading && <ActivityIndicator size="large" />}
            {error && <Error />}
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
        height: 0,
    },

    carousel: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
