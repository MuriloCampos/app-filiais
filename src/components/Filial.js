import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

const Filial = ({filial}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome: {filial.nome}</Text>
            <Text style={styles.label}>Cidade: {filial.cidade}</Text>
            <Text style={styles.label}>CNPJ: {filial.cnpj}</Text>
            <Text style={styles.label}>Endereço: {filial.endereco}</Text>
            <Text style={styles.label}>E-mail: {filial.email}</Text>
        </View>
    );
}

export default Filial;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: '100',
      },
});