import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from '../styles/DashboardStyles'; // Importando os estilos organizados em um arquivo separado
import { fetchStats } from '../services/api'; // Importando a função para buscar dados da API
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    // Buscar dados da API
    useEffect(() => {
        const loadData = async () => {
            try {
                const stats = await fetchStats(); // Chamando a função de API
                setData(stats);
                setLoading(false);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível buscar os dados da API');
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
