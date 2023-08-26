import React from 'react';
import '../../sass/componets/_spinnerLoader.scss'; // Make sure to create this CSS file

const SpinnerLoader = () => {
  return (
    <div className='spinner-container'>
      <div className='spinner'></div>
    </div>
  );
};

export default SpinnerLoader;
