const fs = require('fs').promises;
const fsExistsSync = require('fs').existsSync;
const fetch = require('node-fetch');

// Loads all four bundles by using fetch and write streams
class Loader {
  static async loadBundleFrom(url, bundleName) {
    let res = await fetch(url)
      .catch(err => { console.error(err); });
    let text = await res.text();
      
    let filePath = `./server/bundles/${bundleName}.js`;

    // Save the bundle into the file system, then require it
    await fs.writeFile(filePath, text)
      .catch(err => { console.error(err); });

    return require(filePath).default;
  }

  // Attempt to find the bundle in the file system
  static async loadBundle(bundleName, bundleURL) {
    // Use fs stat
    let filePath = `./server/bundles/${bundleName}.js`;
    let exists = fsExistsSync(filePath);

    // If found, require the file and return the resultant object
    if (exists) {
      return require(filePath).default;
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
