module.exports = {
   
    project:{
        ios:{},
        android:{}
    },
    assets:["./assets/font"],
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-dotenv',
    ],
    env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },

}

