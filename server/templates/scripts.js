module.exports = (items) => `
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

  <script src="https://s3-us-west-1.amazonaws.com/hivefunder-funding/funding/bundle.js" async></script>

  <script>
    ${items.map(item => `
      ReactDOM.hydrate(
        React.createElement(${item}),
        document.getElementById('${item}')
      );`).join('\n')}
  </script>
`;
