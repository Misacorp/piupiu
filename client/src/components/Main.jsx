import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainStructure = ({ className }) => (
  <div className={className}>
    <h1>Your application goes here</h1>
  </div>
);

const Main = styled(MainStructure)`
  /* None of these styles are essential for your application. Go ahead. Destroy them. */

  width: 100%;
  height: 100vh;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.primary.main};

  h1 {
    display: inline-block;
    position: relative;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    padding: 3rem;
    margin: 0;
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

MainStructure.propTypes = {
  className: PropTypes.string,
};

export default Main;
