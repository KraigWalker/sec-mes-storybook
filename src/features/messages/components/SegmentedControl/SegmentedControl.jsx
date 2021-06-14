import { useLocation } from 'react-router-dom';
import { Segment } from '../Segment';
import { ImposterSegment } from '../ImposterSegment';
import s from './SegmentedControl.module.css';

function getTranslateX(pathname) {
  switch (pathname) {
    default:
    case '/': {
      return 0;
    }
    case '/sent': {
      return 100;
    }
    case '/draft': {
      return 200;
    }
    case '/archive': {
      return 300;
    }
  }
}

function SegmentedControl() {
  const location = useLocation();

  return (
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
              transform:
                'translateX(' + getTranslateX(location.pathname) + '%)',
            }}
          >
            <div
              className={s.imposterList}
              style={{
                /* We don't use translate3d() here as the gpu often gives us blurry artifacts */
                transform:
                  'translateX(-' + getTranslateX(location.pathname) + '%)',
              }}
            >
              <ImposterSegment label={'Inbox'} /> {/* translateX(0) */}
              <ImposterSegment label={'Sent'} /> {/* -100% */}
              <ImposterSegment label={'Draft'} /> {/* -200% */}
              <ImposterSegment label={'Archives'} /> {/* -300% */}
            </div>
          </div>
        </div>
        <ul className={s.list}>
          <Segment
            label={'Inbox'}
            to={'/'}
            isCurrent={location.pathname === '/'}
          />
          <Segment
            label={'Sent'}
            to={'/sent'}
            isCurrent={location.pathname === '/sent'}
          />
          <Segment
            label={'Drafts'}
            to={'/draft'}
            isCurrent={location.pathname === '/drafts'}
          />
          <Segment
            label={'Archive'}
            to={'/archive'}
            isCurrent={location.pathname === '/archive'}
          />
        </ul>
      </div>
    </nav>
  );
}

export { SegmentedControl };
