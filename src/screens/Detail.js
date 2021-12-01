import React, { useState, useEffect } from 'react'
import {
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    View,
    Modal,
    Pressable
} from 'react-native';
import { getMovie } from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from "../components/PlayButton";
import VideoPlayer from 'react-native-video-controls';
const plaveHolderImage = require("../assets/images/placeholder.png");
const height = Dimensions.get("screen").height;

const Detail = ({ route, navigation }) => {
    const movieId = route.params.movieDetail;
    const [detail, setDetail] = useState();
    const [loaded, setLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getMovie(movieId)
            .then(
                movieData => {
                    setDetail(movieData);
                    setLoaded(true);
                }
            )
    }, [movieId])

    const VideoPlay = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <React.Fragment>
            {
                loaded && (
                    <View>
                        <ScrollView>
                            <Image
                                style={styles.imagen}
                                resizeMode="cover"
                                source={detail.poster_path
                                    ? { uri: `https://image.tmdb.org/t/p/w500` + detail.poster_path }
                                    : plaveHolderImage
                                }
                            />
                            <View style={styles.container}>
                                <View style={styles.playbutton}>
                                    <PlayButton
                                        handlePress={VideoPlay} />

                                </View>
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
                                                        <Text style={styles.genre}
                                                            key={genre.id}>
                                                            {genre.name}
                                                        </Text>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                }
                                <StarRating
                                    maxStars={10}
                                    rating={detail.vote_average}
                                    disabled={true}
                                    fullStarColor={"gold"}
                                    starSize={30}
                                />
                                <Text style={styles.overview}>
                                    {detail.overview}
                                </Text>
                                <Text style={styles.release}>
                                    {"fecha de lanzamiento:" + dateFormat(detail.release_date, "mmmm dd, yyyy")}
                                </Text>
                            </View>
                        </ScrollView>
                        <Modal
                            animationType="slide"
                            visible={modalVisible}
                        >
                            <View style={styles.ViewModal}>
                                < VideoPlayer
                                    source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
                                    navigator={this.utilería.navegador}
                                /> ;
                            </View>
                        </Modal>
                    </View>
                )}
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
    },

    playbutton: {
        position: "absolute",
        top: -25,
        right: 20,
    },

    ViewModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})