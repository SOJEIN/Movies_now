import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios";

const getPopularMovies = async () => {
  const resp = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=caf3722c95f7ef6a3aa4080593af8e0e&language=en-US&page=1");
  return resp.data.results;
}

const App = () => {
  const [movie, setmovie] = useState("");
  console.log("datos", movie)
  getPopularMovies().then(movies => {
    setmovie(movies[0]);
  });
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text>Nombre de la pelicula:{movie.original_title}</Text>
      <Text>Idioma:{movie.original_language}</Text>
      <Text>Año de la pelicula:{movie.release_date}</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
