import React from 'react';
import dva from 'dva/mobile';
import Test from '../routes/Test';

// 1. Initialize
const app = dva();

// 2. Model
app.model(require('../models/test'));

// 3. View

// 4. Router
app.router(() => <Test />);

// 5. Start
app.start('#root');
