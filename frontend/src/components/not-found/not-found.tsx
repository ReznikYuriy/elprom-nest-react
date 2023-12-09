import * as React from 'react';
import styles from './not-found.module.css';
import iconLogo from '../../assets/images/logo.png';
import clsx from 'clsx';

function NotFound() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div
        className={clsx(styles.notFoundContainer, styles.flexColumnCentered)}
      >
        <h1 className={styles.textNotFound}>
          <span className={styles.text404}>404</span> Page not found
        </h1>
      </div>
      <footer
        className={clsx(styles.footerContainer, styles.flexColumnCentered)}
      >
        <img
          className={styles.logo}
          src={iconLogo}
          height="45"
          width="150"
          loading="lazy"
          alt="Electroprom Logo"
        />
        <p className={styles.footerText}>
          {currentYear} <span>&#169;</span> Electroprom
        </p>
      </footer>
    </>
  );
};

export default NotFound;
