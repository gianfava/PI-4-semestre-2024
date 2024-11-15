// src/components/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSubmit = async () => {
        // Simulando autenticação para exemplo
        try {
            // Simule o login aqui (você poderia fazer uma requisição à sua API, por exemplo)
            // const response = await axios.post("http://localhost:3000/auth/login", { email, password });
            // const { token } = response.data;
            // AsyncStorage.setItem("token", token);
            onLogin();
            navigation.navigate('Dashboard');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao fazer login');
            console.error("Erro ao fazer login", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/login-sf.png')} style={styles.loginImage} />
            <Text style={styles.title}>Login</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.secondaryButtonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff'
    },
    loginImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 12,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    secondaryButton: {
        marginTop: 10,
        paddingVertical: 10,
    },
    secondaryButtonText: {
        color: '#007AFF',
    },
});

export default Login;
