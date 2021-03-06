import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
    const [ result, setResult ] = useState(null);
    const id = navigation.getParam('id');

    const getResult = async id => {
        const { data } = await yelp.get(`/${id}`);
        setResult(data);
    };

    useEffect(() => {
        getResult(id);
    }, []);

    if (!result) return null;
    return (
        <View>
            <FlatList
                data={result.photos}
                keyExtractor={photo => photo}
                renderItem={({ item }) => <Image style={styles.image} source={{ uri: item }} />}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200
    }
});

export default ResultsShowScreen;