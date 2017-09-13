import * as express from 'express';
import App from './app';
// Mount the WelcomeController at the /welcome route
const port = normalizePort(process.env.PORT || 3001);
App.set('port', port);
App.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`);
});

function normalizePort(val: number|string): number|string|boolean{

	let port: number = (typeof val === 'string') ? parseInt(val,10): val;

	if(isNaN(port)) return val;
	else if(port > 0 ) return port;
	else return false;

}
