import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { SegmentedControl } from '../../components/SegmentedControl';
import { MessageList } from '../../components/MessageList';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import s from './SecureMessageListView.module.css';

/**
 * @todo
 * Currently we just render different ListView variants like a route.
 * However, for best-in-class UX we should think about enter-leave transition animations.
 * The idea being to slide in-and-out the list views left and right as the user
 * taps the SegmentedControl. mimicking iOS view controlers.
 *
 * This is a bit harder to do than I thought, so I'll leave this to when we
 * have something that's closer to a finished app.
 * @returns
 */
function SecureMessageListView() {
  const { url } = useRouteMatch('/secure-messages');
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      {/**
       * @todo dispatch a push action to connected-react-router, taking them to /new
       */}
      <div className={s.buttonPositioner}>
        <FloatingActionButton
          label="Compose"
          labelId="actionButton"
          onClick={() => {
            history.push('/secure-messages/new');
          }}
        />
      </div>
      {/*<div>Success Modal (?)</div>*/}
      <div className={s.scrollContainer}>
        <div className={s.navContainer}>
          <div className={s.navPositioner}>
            <SegmentedControl />
          </div>
        </div>
        <main id="main" className={s.main}>
          <Switch location={location}>
            <Route exact strict path={url} children={<MessageList />} />
            <Route
              exact
              strict
              path={`${url}/sent`}
              children={<MessageList statusFilter={'SENT'} />}
            />
            <Route
              exact
              strict
              path={`${url}/drafts`}
              children={<MessageList statusFilter={'DRAFT'} />}
            />
            <Route
              exact
              strict // ARCHIVED
              path={`${url}/archive`}
              children={<MessageList statusFilter={'ARCHIVED'} />}
            />
          </Switch>
        </main>
      </div>
    </>
  );
}

export { SecureMessageListView };
