import * as express from 'express';
import App from './app';
//generate a port for the host on which application run Ex. for local "http://localhost:3001/" 
const port = normalizePort(process.env.PORT || 3001);
App.set('port', port);
App.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

function normalizePort(val: number|string): number|string|boolean{

	let port: number = (typeof val === 'string') ? parseInt(val,10): val;

	if(isNaN(port)) return val;
	else if(port > 0 ) return port;
	else return false;

}
