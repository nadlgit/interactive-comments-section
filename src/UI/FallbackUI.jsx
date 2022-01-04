import React from 'react';
import styles from './FallbackUI.module.css';

export default function FallbackUI({error, resetErrorBoundary}) {
  return (
    <div className={styles.fallback}>
      Apologies, something went wrong.
    </div>
  );
}