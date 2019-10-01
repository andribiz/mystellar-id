import React from 'react';
// import Container from '../../components/UI/Container';
import LauncherImage from '../../assets/image/loader5.gif';

const Launcher = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img src={LauncherImage} />
    </div>
  );
};

export default Launcher;
