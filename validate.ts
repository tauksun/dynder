import {existsSync} from 'fs'
import { render } from "./interfaces";

const validate = (data:render):{
    failed:number;
    error?:any;
} => {
    try {
      // Validations //
      // 1. filePath is absolute
      // 2. mapping is a valid object
  
      const filePath:string = data.filePath;
      const mapping:any = data.mapping;
  
      // Check if filePath is passed or not
      if (!filePath) {
        throw "No value for filePath found";
      }
      const isExists:boolean = existsSync(filePath);
  
      // Check if file exists
      if (!isExists) {
        throw `File : ${filePath} does not exists`;
      }
  

      // Check if mapping exists
      if(!mapping){
        throw "mapping object is missing"
      }

      // Check mapping is an valid object
      const typeOfMapping:string = typeof mapping;
  
      if (typeOfMapping !== "object" && !typeOfMapping.length) {
        throw "mapping is not a valid object";
      }
  
      // Validation Success
      return {
        failed: 0,
      };
    } catch (error:any) {
      return {
        failed: 1,
        error: `Error occured in validation : ${error}`,
      };
    }
  };

  export {validate}