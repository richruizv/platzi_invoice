import { global } from '../global.js';


export const listProducts = async () => {
    const response = await fetch(global + 'index.php/product/list');
    const myJson = await response.json(); //extract JSON from the http response

    return myJson
    // do something with myJson
  }
