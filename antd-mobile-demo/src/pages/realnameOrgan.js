import React from 'react';
import dva from 'dva/mobile';
import createLoading from 'dva-loading';
import RealnameOrgan from '../routes/RealnameOrgan';

// 1. Initialize
const app = dva();

app.use(createLoading());

// 2. Model
app.model(require('../models/realnameOrgan'));

// 3. View

// 4. Router
app.router(() => <RealnameOrgan />);

// 5. Start
app.start('#root');
