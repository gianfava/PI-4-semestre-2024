import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    // Função para buscar os dados da API
    const fetchStats = async () => {
        try {
            const response = await axios.get('http://192.168.56.1:3001/api/v1/stats/atual');
            setData(response.data);
            setLoading(false);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível buscar os dados da API');
            console.error('Erro ao buscar dados da API:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            {data ? (
                <View style={styles.statsContainer}>
                    <Text style={styles.statText}>
                        🌡️ Temperatura Atual: {data.temperatura.toFixed(1)}°C
                    </Text>
                    <Text style={styles.statText}>
                        💧 Umidade Atual: {data.umidade.toFixed(1)}%
                    </Text>
                </View>
            ) : (
                <Text style={styles.errorText}>Erro ao carregar dados.</Text>
            )}

            {/* Container dos botões */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Temperature')}
                >
                    <Text style={styles.buttonText}>🌡️ Temperatura</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Humidity')}
                >
                    <Text style={styles.buttonText}>💧 Umidade</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Alert.alert('Projeções', 'Funcionalidade ainda não implementada.')}
                >
                    <Text style={styles.buttonText}>📈 Projeções</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    statsContainer: {
        marginBottom: 30,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '100%',
        elevation: 3, // Para sombras no Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4, // Para sombras no iOS
    },
    statText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    buttonsContainer: {
        width: '100%', // Garante que o container dos botões ocupa toda a largura do dispositivo
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10, // Espaço entre os botões
        width: '100%', // O botão ocupa 100% da largura do container
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
