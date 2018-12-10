// search model
import axios from 'axios';
import {url, key} from '../config';


export default class Search {
   constructor(query) {
       this.query = query;
   }

    async getResults(query) {
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            // console.log(res);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert('uh oh');
        }
    }
}