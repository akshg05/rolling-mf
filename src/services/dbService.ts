import Dexie from "dexie"
import { SearchResponse } from "../models/SearchResponse";


export class MfundDb extends Dexie {
    recentSearches: Dexie.Table<SearchResponse, number>;
    
    constructor() {  
      super("MfundDb");
      
      //
      // Define tables and indexes
      // (Here's where the implicit table props are dynamically created)
      //
      this.version(1).stores({
        recentSearches: 'schemeName',
        
      });
      
      // The following lines are needed for it to work across typescipt using babel-preset-typescript:
      this.recentSearches = this.table("recentSearches");
    
    }
  }

const db = new MfundDb()
export default db