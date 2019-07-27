import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';


import {connect} from './connect_db';

connect();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
    .use(bodyParser())
    .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware()
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });
