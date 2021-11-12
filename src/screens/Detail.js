import React, { useState, useEffect } from 'react'
import { Text, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator, View } from 'react-native';
import { getMovie } from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';

const plaveHolderImage = require("../assets/images/placeholder.png");
const height = Dimensions.get("screen").height;

const Detail = ({ route, navigation }) => {
    const movieId = route.params.movieDetail;
    const [detail, setDetail] = useState()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getMovie(movieId)
            .then(
                movieData => {
                    setDetail(movieData);
                    setLoaded(true);
                }
            )
    }, [movieId])

    return (
        <React.Fragment>
            {
                loaded && (
                    <ScrollView>
                        <Image
                            style={styles.imagen}
                            resizeMode="cover"
                            source={detail.poster_path
                                ? { uri: `https://image.tmdb.org/t/p/w500` + detail.poster_path }
                                : plaveHolderImage
                            }
                        />
                        <View
                            style={
                                styles.container
                            }>
                            <Text
                                style={
                                    styles.movietitle
                                }>
                                {detail.title}
                            </Text>
                            {
                                detail.genres && (
                                    <View
                                        style={
                                            styles.genrescontainer
                                        }>
                                        {
                                            detail.genres.map(genre => {
                                                return (
                                                    <Text
                                                        style={
                                                            styles.genre
                                                        }
                                                        key={genre.id}
                                                    >
                                                        {genre.name}
                                                    </Text>
                                                )
                                            })
                                        }


                                    </View>
                                )
                            }
                            <StarRating
                                maxStars={5}
                                rating={detail.vote_average / 2}
                                disabled={true}
                                fullStarColor={"gold"}
                                starSize={30}
                            />
                            <Text
                                style={
                                    styles.overview
                                }
                            >
                                {detail.overview}
                            </Text>
                            <Text
                                style={
                                    styles.release
                                }
                            >
                                {"fecha de lanzamiento:" + dateFormat(detail.release_date, "mmmm dd, yyyy")}
                            </Text>
                        </View>
                    </ScrollView>
                )
            }
            {!loaded && <ActivityIndicator size="large" />}
        </React.Fragment>

    );
};

export default Detail;

const styles = StyleSheet.create({

    imagen: {
        height: height / 2
    },

    movietitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    genrescontainer: {
        flexDirection: "row",
        alignContent: "center",
        marginTop: 20,
        marginBottom: 20,
    },

    genre: {
        marginRight: 10,
        fontWeight: "bold",
    },

    overview: {
        padding: 15,
    },

    release: {
        fontWeight: "bold",
    }

})