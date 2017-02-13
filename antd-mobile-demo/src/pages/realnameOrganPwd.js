import React from 'react';
import dva from 'dva/mobile';
import createLoading from 'dva-loading';
import RealnameOrganPwd from '../routes/RealnameOrganPwd';

// 1. Initialize
const app = dva();

app.use(createLoading());

// 2. Model
app.model(require('../models/realnameOrganPwd'));

// 3. View

// 4. Router
app.router(() => <RealnameOrganPwd />);

// 5. Start
app.start('#root');
