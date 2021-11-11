import React from 'react'
import { Text } from 'react-native';

const Detail = ({ route, navigation }) => {
    const movieDetail = route.params.movieDetail;
    console.log("object", movieDetail)
    return (
        <React.Fragment>
            <Text>
                {movieDetail.title}
            </Text>
        </React.Fragment>

    );
};

export default Detail;