import React from 'react';
import dva, { connect } from 'dva/mobile';
import { Button, List, SwipeAction } from 'antd-mobile';

// 1. Initialize
const app = dva();

// 2. Model
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add(count) { return count + 1; },
    minus(count) { return count - 1; },
  },
});

// 3. View
const App = connect(({ count }) => ({
  count,
}))(() => {
  return (
    <div>
      <Button type="primary">primary 按钮</Button>
      <List>
        <SwipeAction
          style={{ backgroundColor: 'gray' }}
          autoClose
          right={[
            {
              text: '取消',
              onPress: () => console.log('取消'),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
            {
              text: '删除',
              onPress: () => console.log('删除'),
              style: { backgroundColor: '#F4333C', color: 'white' },
            },
          ]}
          left={[
            {
              text: '回复',
              onPress: () => console.log('回复'),
              style: { backgroundColor: '#108ee9', color: 'white' },
            },
            {
              text: '取消',
              onPress: () => console.log('取消'),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
          ]}
          onOpen={() => console.log('global open')}
          onClose={() => console.log('global close')}
        >
          <List.Item
            extra="更多"
            arrow="horizontal"
          >
              左右都可操作
          </List.Item>
        </SwipeAction>
      </List>
    </div>
  );
});

// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#root');
