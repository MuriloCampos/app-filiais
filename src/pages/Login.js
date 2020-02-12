import React, { useState, useEffect } from 'react';
import { View, AsyncStorage,KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                navigation.navigate('Lista');
            }
        })
    },[]);

    async function handleSubmit() {
        const credentials = {
            email: email,
            senha: senha
        }

        const response = await api.post('/login', credentials)
        const token = response.data.access_token

        await AsyncStorage.setItem('token', token);

        navigation.navigate('Lista');
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>E-MAIL</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>SENHA</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Sua senha"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    textContentType="password"
                    autoCorrect={false}
                    value={senha}
                    onChangeText={setSenha}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});