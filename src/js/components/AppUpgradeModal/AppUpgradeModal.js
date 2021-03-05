import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PageHeading } from 'web-ui-components/lib/typography/headings';
import { StandardBody } from 'web-ui-components/lib/typography/body';
import { ConfirmButton } from './ConfirmButton';
import { UpgradeIcon } from './UpgradeIcon';
import styles from './styles.module.css';

/**
 * Gets the brand id from a provided redux store. Used with react-redux useSelector
 */
function brandSelector(state) {
  return state.brand;
}

function getBrandStyleClassName(brand) {
  switch (brand) {
    case 'CB':
      return styles.cb;
    case 'YB':
      return styles.yb;
    case 'B':
      return styles.b;
    case 'VM':
    default:
      return styles.vm;
  }
}

function getBrandColour(brand) {
  switch (brand) {
    case 'CB':
      return 'B32519';
    case 'YB':
      return '529BCA';
    case 'B':
      return '00DB6D';
    case 'VM':
    default:
      return 'E10A0A';
  }
}

function AppUpgradeModal({ onDismiss }) {
  const brand = useSelector(brandSelector);
  const brandColour = getBrandColour(brand);
  const brandClassName = getBrandStyleClassName(brand);

  useEffect(() => {
    // When the modal is displaying, prevent scrolling the page

    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.getElementById('app').style.display = 'none';

    return function cleanup() {
      // Re-enable scrolling by reverting back to original settings

      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.getElementById('app').style.display = '';
    };
  }, []);

  return (
    <div className={styles.modal}>
      <div className={`${styles.modalBody} ${brandClassName}`}>
        <div className={styles.top}>
          <figure className={styles.iconContainer}>
            <UpgradeIcon strokeColour={'#' + brandColour} />
          </figure>
          <div
            className={`${styles.headingWrapper} ${brandClassName}`}
            style={{
              marginBottom: '64px',
              color: '#' + brandColour + '!important',
            }}
          >
            <PageHeading>Time to update the app</PageHeading>
          </div>
          <StandardBody>
            <p>Hmm. Looks like you’re running an older version of the app.</p>
            <p>
              You’ll need to update to the latest version to see your statements
              here.
            </p>
          </StandardBody>
        </div>
        <div className={styles.bottom}>
          <ConfirmButton onClick={onDismiss} backgroundColour={brandColour} />
        </div>
      </div>
    </div>
  );
}

export { AppUpgradeModal };
