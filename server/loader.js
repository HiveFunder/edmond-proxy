const fs = require('fs').promises;
const fsExistsSync = require('fs').existsSync;
const fetch = require('node-fetch');

// Filepaths
let filePathFor = function(bundleName) {
  return `./server/bundles/${bundleName}.js`;  
};

let requirePathFor = function(bundleName) {
  return `./bundles/${bundleName}.js`;  
};

// Loads all four bundles by using fetch and write streams
class Loader {
  static async loadBundleFrom(url, bundleName) {
    let res = await fetch(url)
      .catch(err => { console.error(err); });
    let text = await res.text();

    // Save the bundle into the file system, then require it
    await fs.writeFile(filePathFor(bundleName), text)
      .catch(err => { console.error(err); });

    return require(requirePathFor(bundleName)).default;
  }

  // Attempt to find the bundle in the file system
  static async loadBundle(bundleName, bundleURL) {
    // Use fs stat
    
    let exists = fsExistsSync(filePathFor(bundleName));

    // If found, require the file and return the resultant object
    if (exists) {
      return require(requirePathFor(bundleName)).default;
    } else {
      return Loader.loadBundleFrom(bundleURL, bundleName);
    }

    // Otherwise load the bundle and return that!
  }

  static async load(bundleNames, bundleURLs) {
    let result = [];
    for (let i = 0; i < bundleNames.length; i++) {
      result.push(await Loader.loadBundle(bundleNames[i], bundleURLs[i]));
    }

    return result;
  }
}

module.exports = Loader;
