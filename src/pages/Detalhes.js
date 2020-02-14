import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Appbar } from 'react-native-paper';

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

    function voltar(){
        navigation.navigate('Lista');
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={voltar}
                />
                <Appbar.Content
                    title={navigation.state.params.filial.nome}
                />
            </Appbar.Header>
            <View style={styles.detalhes}>
            
                <Filial filial={navigation.state.params.filial} />
                <Button mode='contained' onPress={abrirMapa}>
                    Ver no mapa
                </Button>
            </View>
        </>
        
        );
}

const styles = StyleSheet.create({
    detalhes:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginBottom: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
});