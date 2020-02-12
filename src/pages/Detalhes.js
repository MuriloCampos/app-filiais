import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';

import Filial from '../components/Filial';

export default function Detalhes( {navigation} ) {
    
    function abrirMapa(){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${navigation.state.params.filial.latitude},${navigation.state.params.filial.longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
        });


        Linking.openURL(url);
    } 

    return (
        <>
            <Filial filial={navigation.state.params.filial} />
            <TouchableOpacity onPress={abrirMapa} style={styles.button}>
                <Text style={styles.buttonText}>Ver no mapa</Text>
            </TouchableOpacity>
        </>
        );
}

const styles = StyleSheet.create({
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
});