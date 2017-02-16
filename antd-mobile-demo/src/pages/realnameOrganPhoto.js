import React from 'react';
import dva from 'dva/mobile';
import createLoading from 'dva-loading';
import RealnameOrganPhoto from '../routes/RealnameOrganPhoto';

// 1. Initialize
const app = dva();

app.use(createLoading());

// 2. Model
app.model(require('../models/realnameOrgan'));
app.model(require('../models/realnameOrganPhoto'));

// 3. View

// 4. Router
app.router(() => <RealnameOrganPhoto />);

// 5. Start
app.start('#root');
