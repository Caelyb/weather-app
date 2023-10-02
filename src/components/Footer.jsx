import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; {new Date().getFullYear()} Weather App | All Rights Reserved
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#333',
    color: '#fff',
    padding: '10px 0',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  text: {
    margin: 0,
    fontSize: '14px',
  },
};

export default Footer;
