//require('newrelic');
const express = require('express');
const path = require('path');

const React = require('react');
const ReactDOM = require('react-dom/server');
const Layout = require('./templates/layout');
const Scripts = require('./templates/scripts');
const Loader = require('./loader');

const PORT = 80;
const app = express();

// Bundle info
bundleNames = ['funding'];
bundleUrls = ['https://s3-us-west-1.amazonaws.com/hivefunder-funding/funding/bundle.js'];

// Serve app.css
app.use(express.static(path.resolve(__dirname, 'public')));

// Acquire the service bundles
const services = Loader.load(bundleNames, bundleUrls);

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
};

app.get('/:id', (req, res) => {
  let components = renderComponents(services, {itemid: req.params.id});
  res.end(Layout(
    components[0], // Maybe use spread?
    '',
    '',
    '',
    Scripts(Object.keys(services))
  ));
});

app.listen(PORT, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Proxy listening at ${PORT}...`);
});
