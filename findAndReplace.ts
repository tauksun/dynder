import {readFileSync} from 'fs'
import { render } from "./interfaces";

const memoryLoadedFiles:any ={}

const findAndReplace = (data:render):{
    failed:number;
    error?:any;
    customScript?:string
} => {
    try {
      const filePath:string = data.filePath;
      const mapping:any = data.mapping;
      const serveFromMemory:boolean = data.serveFromMemory;
  
      // Check in memoryLoadedFiles if serveFromMemory is true
      let str:string = "",
        customScript:string = "",
        variableName:string = "",
        parsingVariable:boolean = false;
  
      if (!(serveFromMemory && memoryLoadedFiles[filePath])) {
        const fileData:Buffer = readFileSync(filePath);
        str = Buffer.from(fileData).toString("utf-8");
      } else {
        str = memoryLoadedFiles[filePath];
      }
  
      // Store in memory if serveFromMemory is true
      if (serveFromMemory && !memoryLoadedFiles[filePath]) {
        memoryLoadedFiles[filePath] = str;
      }
  
      for (let i = 0; i < str.length; i++) {
        if (str[i] === "%") {
          if (parsingVariable === true) {
            customScript += mapping[variableName];
            parsingVariable = false;
            variableName = "";
          } else {
            parsingVariable = true;
          }
        } else if (!parsingVariable) {
          customScript += str[i];
        } else {
          variableName += str[i];
        }
      }
      return { failed: 0, customScript };
    } catch (error:any) {
      return {
        failed: 1,
        error: `Error occured in findAndReplace : ${error}`,
      };
    }
  };

  export {findAndReplace}