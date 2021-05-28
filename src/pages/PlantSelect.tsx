
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { EnviromentButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { plants_environments, plants } from '../services/server.json';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnviromentProps {
  key: string;
  title: string;
}

export function PlantSelect() {

  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plantsCard, setPlantsCard] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  function handleEnviromentSelected(enviroment: string) {
    setEnviromentSelected(enviroment);

    if (enviroment === 'all') {
      return setFilteredPlants(plantsCard);
    }

    const filtered = plantsCard.filter(plantsCard =>
      plantsCard.environments.includes(enviroment)
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlant() {
    const  data  = plants;
    //const { data } = await api.
    //get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlantsCard(oldValue => [...oldValue, ...data,]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    }
    else {
      setPlantsCard(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlant();
  }

  function handlePlantSelect(plant: PlantProps){
    navigation.navigate('PlantSave', {plant});
  }

  useEffect(() => {
    async function fetchEnviroment() {
      //const { data } = await api.get('plants_environments');
      const data = plants_environments;
      setEnviroments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }
    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlant();
  }, []);

  if (loading) {
    return <Load />
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subTitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          /*onEndReachedThreshold={0.1}//chegar a 10% do final
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)}*/ //utilizado  para paginar os elementos esta comentado por causa do servidor json
          ListFooterComponent={
            loadingMore
              ? <ActivityIndicator color={colors.green} />
              : <></>
          }
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subTitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  }
});