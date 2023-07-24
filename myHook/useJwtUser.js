import { useSelector } from 'react-redux';
import { getDataFromSecureStore } from './Secure';

const useJwtUser = async() => {

  
    const value = await getDataFromSecureStore('_authToken');

    return value || null
  

  

};

export default useJwtUser;
