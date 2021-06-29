import { useLocation } from 'react-router-dom';
import { Segment } from '../Segment';
import { ImposterSegment } from '../ImposterSegment';
import s from './SegmentedControl.module.css';

const INBOX_LABEL = 'Inbox',
  SENT_LABEL = 'Sent',
  DRAFTS_LABEL = 'Drafts',
  ARCHIVES_LABEL = 'Archives';

const BASE_PATH = '/secure-messages';

function getCalc(val) {
  return `calc(${val}00% + 0px)`;
}

function getTranslateX(pathname) {
  switch (pathname) {
    default:
    case BASE_PATH: {
      return 0;
    }
    case `${BASE_PATH}/sent`: {
      return getCalc(1);
    }
    case `${BASE_PATH}/drafts`: {
      return getCalc(2);
    }
    case `${BASE_PATH}/archive`: {
      return getCalc(3);
    }
  }
}

function getListTranslateX(pathname) {
  switch (pathname) {
    default:
    case '/': {
      return 0;
    }
    case `${BASE_PATH}/sent`: {
      return `calc(-25% + 0px)`;
    }
    case `${BASE_PATH}/drafts`: {
      return `calc(-50% + 0px)`;
    }
    case `${BASE_PATH}/archive`: {
      return `calc(-75% + 0px)`;
    }
  }
}

function SegmentedControl() {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className={s.borderWrapper}>
      <nav className={s.segmentedControl}>
        {/* sizes both the imposter list and the real list */}
        <div className={s.listContainer}>
          {/* same size as the `.list` ul, floats in front of .list */}
          <div className={s.imposterListContainer} tabIndex={'-1'}>
            {/* Stepper serves as the viewfinder. Has overflow: hidden */}
            <div
              aria-hidden="true"
              className={s.stepper}
              style={{
                transform: 'translateX(' + getTranslateX(pathname) + ')',
              }}
            >
              <div
                className={s.imposterList}
                style={{
                  /* We don't use translate3d() here as the gpu often gives us blurry artifacts */
                  transform:
                    'translateX(' + getListTranslateX(pathname, true) + ')',
                }}
              >
                <ImposterSegment label={INBOX_LABEL} />
                <ImposterSegment label={SENT_LABEL} />
                <ImposterSegment label={DRAFTS_LABEL} />
                <ImposterSegment label={ARCHIVES_LABEL} />
              </div>
            </div>
          </div>
          <ul className={s.list}>
            <Segment
              label={INBOX_LABEL}
              to={BASE_PATH}
              isCurrent={pathname === BASE_PATH}
            />
            <Segment
              label={SENT_LABEL}
              to={`${BASE_PATH}/sent`}
              isCurrent={pathname === `${BASE_PATH}/sent`}
            />
            <Segment
              label={DRAFTS_LABEL}
              to={`${BASE_PATH}/drafts`}
              isCurrent={pathname === `${BASE_PATH}/drafts`}
            />
            <Segment
              label={ARCHIVES_LABEL}
              to={`${BASE_PATH}/archive`}
              isCurrent={pathname === `${BASE_PATH}/archive`}
            />
          </ul>
        </div>
      </nav>
    </div>
  );
}

export { SegmentedControl };
