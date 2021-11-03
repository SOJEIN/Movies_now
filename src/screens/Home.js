import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentaryMovies } from "../services/services"
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';

const dimensions = Dimensions.get('screen');
const Home = () => {
    const [movieImagenes, setMovieImagenes] = useState("");
    const [popularMovies, setPopularMovies] = useState("");
    const [popularTv, setPopularTv] = useState("");
    const [familyMovies, setFamilyMovies] = useState("");
    const [documentaryMovies, setDocumentaryMovies] = useState("");
    const [error, setError] = useState(false);
    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getPopularTv(),
            getFamilyMovies(),
            getDocumentaryMovies(),
        ])
    };

    useEffect(() => {
        getData().then(([
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
            setDocumentaryMovies(documentaryMoviesData)

        }).catch(err => {
            setError(err);
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
                <View style={styles.carousel}>
                    <List
                        title={"Series Familiares"}
                        content={familyMovies}
                    />
                </View>
                <View style={styles.carousel}>
                    <List
                        title={"Documentales"}
                        content={documentaryMovies}
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
