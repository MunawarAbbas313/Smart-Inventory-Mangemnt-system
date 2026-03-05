import React from 'react';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        zIndex: 9999,
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
