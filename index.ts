// Interface
import {dynderI, render,} from './interfaces'

// Modules
import { findAndReplace } from './findAndReplace';
import { validate } from './validate';

/**
 * @example
 * dynder({
 *  filePath:'',// Absolute path to file
 *  mapping:{},// Mapping object for variables
 *  serveFromMemory : true // Boolean value > true | false
 * })
 * 
 */
const _dynder = (data:render):dynderI => {
  try {
    // Validate
    const { failed: validationFailed, error: validationError } = validate(data);
    if (validationFailed) {
      throw validationError;
    }

    // Find & Replace //
    const {
      failed: findAndReplaceFailed,
      error: findAndReplaceError,
      customScript
    } = findAndReplace(data);

    if (findAndReplaceFailed) {
      throw findAndReplaceError;
    }

    // Success Return
    return customScript;
  } catch (error:any) {
    console.log(`Error occured while serving file : ${error}`);
    return null;
  }
};



export const dynder = _dynder;