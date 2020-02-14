import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, AsyncStorage, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar, List, Divider, Appbar } from 'react-native-paper';

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

    function logout(){
        AsyncStorage.removeItem('token').then(navigation.navigate('Login'));
    }

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header>
                <Appbar.Content
                title="Lista de filiais"
                />
                <Appbar.Action icon="logout" onPress={logout} />
            </Appbar.Header>
            
            <FlatList 
                data={list}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={
                    <Searchbar 
                        placeholder="Buscar filial" 
                        onChangeText={updateSearch}
                        value={search} 
                    />
                }
                renderItem={ ({ item }) =>
                    <> 
                        <List.Item
                            titleStyle={styles.item}
                            title={item.nome}
                            onPress={() => {navigation.navigate('Detalhes', {filial: item});}}
                        />
                        <Divider />
                    </>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 3,
        marginVertical: 3,
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