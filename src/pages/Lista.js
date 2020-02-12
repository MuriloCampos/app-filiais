import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, AsyncStorage, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

import api from '../services/api';

export default function Lista({ navigation }) {
    const[filiais, setFiliais] = useState([]);
    const[list, setList] = useState([]);
    const[search, setSearch] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            
            const AuthStr = 'Bearer '.concat(token);
            api.get('/filiais', { headers: { Authorization: AuthStr } })
            .then(response => {
                setFiliais(response.data);
                setList(response.data);
             })
            .catch((error) => {
                console.log('error ' + error);
             });
        })
    }, []);

    updateSearch = search => {
        let items = filiais;

        const newData = items.filter(function(item) {
            const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
            const textData = search.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
          setList(newData);
          setSearch(search);

    };

    return (
        <SafeAreaView style={styles.container}>
            
            <FlatList 
                data={list}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={
                    <SearchBar 
                        placeholder="Buscar filial" 
                        lightTheme round
                        onChangeText={updateSearch}
                        value={search} 
                    />
                }
                renderItem={ ({ item }) => 
                <TouchableOpacity onPress={() => {navigation.navigate('Detalhes', {filial: item});}}>
                    <Text style={styles.item}>
                        {item.nome}
                    </Text>
                </TouchableOpacity>
                
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },
    item: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        backgroundColor: '#ddd',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 10,
      },
    button: {
        height: 42,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        width: (Dimensions.get("screen").width)*0.2
    },
});