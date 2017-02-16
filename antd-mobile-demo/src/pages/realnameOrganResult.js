import React from 'react';
import dva from 'dva/mobile';
import createLoading from 'dva-loading';
import RealnameOrganResult from '../routes/RealnameOrganResult';

// 1. Initialize
const app = dva();

app.use(createLoading());

// 2. Model
app.model(require('../models/realnameOrganResult'));

// 3. View

// 4. Router
app.router(() => <RealnameOrganResult />);

// 5. Start
app.start('#root');
