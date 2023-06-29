import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from '../loader';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  })
  if (isLoading) {
    return <Loader />;

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#fff' }}>
      <Text   style={{ fontSize: 20, fontWeight: 'bold' }}>Yes I am {user.username}</Text>
    </View>
  )
}

export default Dashboard