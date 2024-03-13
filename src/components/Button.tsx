import React, { ReactNode } from 'react';

const Button = (props: {
  children?: ReactNode;
  backgroundColor?: string;
  [x: string]: any;
}) => {
  const { children, backgroundColor } = props;
  const newProps = { ...props };
  // remove the backgroundColor and children from the newProps
  delete newProps.backgroundColor;
  delete newProps.children;
  return (
    // return a button with the backgroundColor and children
    <button
      className={`${backgroundColor} text-white p-3 rounded-md`}
      {...newProps}
    >
      {children}
    </button>
  );
};

export default Button;
