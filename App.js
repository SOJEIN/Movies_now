import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getPopularMovies } from "./src/services/services"
const App = () => {
  const [movie, setmovie] = useState("");
  const [error, seterror] = useState(false);

  useEffect(() => {
    getPopularMovies().then(movies => {
      setmovie(movies[0]);
    }).catch(err => {
      seterror(err);
    });
  }, [])

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text>Nombre de la pelicula:{movie.original_title}</Text>
      <Text>Idioma:{movie.original_language}</Text>
      <Text>Año de la pelicula:{movie.release_date}</Text>
      {error && <Text style={styles.error}>Error en el servidor</Text>}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  error: {
    color: "red",
  }
})
