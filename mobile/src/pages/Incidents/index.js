import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';

import api from '../../services/api';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]); 

    // const [total, setTotal] = useState(0);

    // const [page, setPage] = useState(1);
    // const [loading, setLoading] =useState(false);

    // const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', {incident});
    }

    // async function loadIncidents() {
    //     if(loading) {
    //         return;
    //     }

    //     if(total > 0 && incidents.length === total) {
    //         return;
    //     }

    //     setLoading(true);
        
    //     const response = await api.get('incidents', {
    //         params: { page }
    //     });
    //     setIncidents(...incidents, ...response.data);
    //     setTotal(response.headers['x-total-count']);
    //     setPage(page + 1);
    //     setLoading(false);
    // }

    async function loadIncidents() {
        const response = await api.get('incidents');

        setIncidents(response.data);
    }

    useEffect(() => {
        
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de: <Text style={styles.headerTextBold}>casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList 
            data={incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({ item : incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.verbose)}</Text>

                    <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02441" />
                    </TouchableOpacity>

                </View>
            )}
            /> 
        </View>
    );
}