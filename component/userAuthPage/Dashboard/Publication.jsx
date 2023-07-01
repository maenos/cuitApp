import { FlatList, View, Text } from 'react-native';
import React from 'react'

const Publication = () => {
    const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    // Ajoutez plus d'objets de données ici
  ];

  const renderItem = ({ item }) => (
    <View style={{  height: 300, backgroundColor: '#fff', marginVertical: 4,borderRadius: 14,borderColor: '#000',borderWidth: 1 }}>
      <Text style={{fontSize: 20,textAlign: 'center',}}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default Publication