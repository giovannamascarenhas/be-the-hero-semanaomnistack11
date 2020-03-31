import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png'

export default function Detail() {
    const navigation = useNavigation();

    const route = useRoute();
    const incident = route.params('incident');
    const message = "Olá, estamos entrando em contato do Be The Hero";

    function navigateBack() {
        navigation.goBack('Incidents');
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ['giovanna.mascarenhas.1@gmail.com'],
            body: message,
        });
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=914663828?text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02441" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
            <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.verbose)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói nesse caso</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}