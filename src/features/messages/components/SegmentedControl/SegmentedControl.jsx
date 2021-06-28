import { useLocation } from 'react-router-dom';
import { Segment } from '../Segment';
import { ImposterSegment } from '../ImposterSegment';
import s from './SegmentedControl.module.css';

const INBOX_LABEL = 'Inbox',
  SENT_LABEL = 'Sent',
  DRAFTS_LABEL = 'Drafts',
  ARCHIVES_LABEL = 'Archives';

function getTranslateX(pathname) {
  switch (pathname) {
    default:
    case '/': {
      return 0;
    }
    case '/sent': {
      return `calc(100% + 0px)`; // ;99;
    }
    case '/draft': {
      return `calc(200% + 0px)`; //198;
    }
    case '/archive': {
      return `calc(300% + 0px)`; // 300;
    }
  }
}

function getListTranslateX(pathname) {
  switch (pathname) {
    default:
    case '/': {
      return 0;
    }
    case '/sent': {
      return `calc(-25% + 0px)`; // ;99;
    }
    case '/draft': {
      return `calc(-50% + 0px)`; //198;
    }
    case '/archive': {
      return `calc(-75% + 0px)`; // 300;
    }
  }
}

function SegmentedControl() {
  const { pathname } = useLocation();

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
                <ImposterSegment label={INBOX_LABEL} /> {/* translateX(0) */}
                <ImposterSegment label={SENT_LABEL} /> {/* -100% */}
                <ImposterSegment label={DRAFTS_LABEL} /> {/* -200% */}
                <ImposterSegment label={ARCHIVES_LABEL} /> {/* -300% */}
              </div>
            </div>
          </div>
          <ul className={s.list}>
            <Segment
              label={INBOX_LABEL}
              to={'/'}
              isCurrent={pathname === '/'}
            />
            <Segment
              label={SENT_LABEL}
              to={'/sent'}
              isCurrent={pathname === '/sent'}
            />
            <Segment
              label={DRAFTS_LABEL}
              to={'/draft'}
              isCurrent={pathname === '/drafts'}
            />
            <Segment
              label={ARCHIVES_LABEL}
              to={'/archive'}
              isCurrent={pathname === '/archive'}
            />
          </ul>
        </div>
      </nav>
    </div>
  );
}

export { SegmentedControl };
