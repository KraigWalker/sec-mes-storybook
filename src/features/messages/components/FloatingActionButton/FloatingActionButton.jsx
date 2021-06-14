import styles from './FloatingActionButton.module.css';

function FloatingActionButton({ children }) {
  <button type="button" className={styles.button}>
    <span className={styles.label}>{children}</span>
  </button>;
}

return { FloatingActionButton };
