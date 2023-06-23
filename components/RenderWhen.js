import React from 'react';

const RenderWhen = ({children, isTrue}) => {
  if (!isTrue) {
    return null;
  }

  return <>{children}</>;
};

export default RenderWhen;
