import { global } from '../global.js';


export const getCode = async (code) => {
    const response = await fetch(global + 'index.php/promotion/getCode?code='+code);
    const myJson = await response.json(); //extract JSON from the http response

    return myJson
    // do something with myJson
  }
