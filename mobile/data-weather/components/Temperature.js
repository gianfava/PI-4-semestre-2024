import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchStats } from '../services/api'; // Reaproveitando a função da API
import styles from '../styles/TemperatureStyles';

export default function Temperature() {
    const [currentTemp, setCurrentTemp] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Buscar temperatura atual
                const currentStats = await fetchStats(); // Função que já busca `http://192.168.56.1:3001/api/v1/stats/atual`
                setCurrentTemp(currentStats.temperatura);

                // Buscar estatísticas de temperatura
                const response = await fetch('http://192.168.56.1:3001/api/v1/stats/temperatura');
                const temperatureStats = await response.json();
                setStats(temperatureStats);

                setLoading(false);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados de temperatura.');
                console.error('Erro ao carregar dados:', error);
                setLoading(false);
            }
        };

        loadData();
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
            <Text style={styles.title}>Temperatura</Text>

            {/* Contêiner da temperatura atual */}
            {currentTemp && (
                <View style={styles.statsContainer}>
                    <Text style={styles.statText}>🌡️ Temperatura Atual: {currentTemp.toFixed(1)}°C</Text>
                </View>
            )}

            {/* Contêiner dos dados de estatísticas */}
            {stats && (
                <View style={styles.statsContainer}>
                    <Text style={styles.statText}>📊 Estatísticas de Temperatura</Text>
                    <Text style={styles.statText}>Média: {stats.media.toFixed(1)}°C</Text>
                    <Text style={styles.statText}>Mediana: {stats.mediana.toFixed(1)}°C</Text>
                    <Text style={styles.statText}>Desvio Padrão: {stats.desvioPadrao.toFixed(1)}°C</Text>
                    <Text style={styles.statText}>Mínimo: {stats.minimo.toFixed(1)}°C</Text>
                    <Text style={styles.statText}>Máximo: {stats.maximo.toFixed(1)}°C</Text>
                </View>
            )}
        </View>
    );
}
