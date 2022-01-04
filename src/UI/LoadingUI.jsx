import React from 'react';
import styles from './LoadingUI.module.css';

export default function LoadingUI() {
  return (
    <div className={styles.loading}>
      Loading comments, please wait ...
    </div>
  );
}