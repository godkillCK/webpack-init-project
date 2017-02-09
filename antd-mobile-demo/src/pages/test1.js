import React from 'react';
import dva from 'dva/mobile';
import Test1 from '../routes/Test1';

// 1. Initialize
const app = dva();

// 2. Model
app.model(require('../models/test1'));

// 3. View

// 4. Router
app.router(() => <Test1 />);

// 5. Start
app.start('#root');
