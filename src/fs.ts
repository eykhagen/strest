import * as recursiveWalk from 'recursive-readdir';
import * as path from 'path';
import * as fs from 'fs';
var sortPaths = require('sort-paths');


/**
 * Find all .strest.yaml files
 * @param dir [optional] Target dir with .strest.yaml files in it
 */
export const findTestFiles = async (dir: string) => {
  let cwd = process.cwd();
  let isFile = false;
  // if a custom path was defined
  if(dir !== null){
    cwd = path.join(process.cwd(), dir);
    if(!fs.existsSync(cwd)){
      return null;
    }
    isFile = fs.statSync(cwd).isFile();
  }
  // if the path is a directory, walk through it and find all test files
  if(!isFile) {
    // get all files paths (except those in .git and node_modules folder)
    const files = await recursiveWalk(cwd, ['node_modules', '.git']);

    // all matching file paths will be stored here
    let matchList: string[] = [];

    // find all files that end with .strest.yaml
    files.map((path) => {
      const rg1 = new RegExp('.*\.strest\.yaml$');
      const rg2 = new RegExp('.*\.strest\.yml$');
      if(rg1.test(path) === true || rg2.test(path)) {
        matchList.push(path);
      }  
    })
    return sortPaths(matchList, "/");
  }
  // return just the file that was specified
  return [cwd];
}