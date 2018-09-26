exports.initExpress = (app) => {
  // setup the port so that the server/index.js can use it.
  app.set('port', (process.env.PORT || 3000));

  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Listening on port: ${app.get('port')}`);
  console.log('--------------------------');
};
