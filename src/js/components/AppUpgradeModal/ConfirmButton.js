import { StandardLabel } from 'web-ui-components/lib/typography/labels';
import styles from './ConfirmButton.module.css';

function ConfirmButton({ onClick, backgroundColour = 'E10A0A' }) {
  return (
    <button
      className={`${styles.confirmButton}`}
      style={{ backgroundColor: '#' + backgroundColour }}
      onClick={onClick}
    >
      <StandardLabel isFlush={true}>Ok, got it</StandardLabel>
    </button>
  );
}

export { ConfirmButton };
