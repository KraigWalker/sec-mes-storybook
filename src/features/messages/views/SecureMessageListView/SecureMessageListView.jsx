import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import { SegmentedControl } from '../../components/SegmentedControl';
//import { MessageList } from '../../components/MessageList';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import s from './SecureMessageListView.module.css';

function Container({ children }) {
  return <div className={s.container}>{children}</div>;
}

function Wrap({ children, colour }) {
  return (
    <div className={s.wrapper} style={{ backgroundColor: colour }}>
      {children}
    </div>
  );
}

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

  return (
    <>
      <Link to={`${url}/new`}>New Secure Message</Link>
      <div>Success Modal (?)</div>
      <div>
        <SegmentedControl />
        <main id="main" className={s.main}>
          <Switch location={location}>
            <Route
              exact
              strict
              path={url}
              children={
                <Wrap colour="blue">
                  <h1>Inbox</h1>
                </Wrap>
              }
            />
            <Route
              exact
              strict
              path={`${url}/sent`}
              children={
                <Wrap colour="red">
                  <h1>Sent</h1>
                </Wrap>
              }
            />
            <Route
              exact
              strict
              path={`${url}/drafts`}
              children={
                <Wrap colour="green">
                  <h1>Drafts</h1>
                </Wrap>
              }
            />
            <Route
              exact
              strict
              path={`${url}/archive`}
              children={
                <Wrap colour="purple">
                  <h1>Archive</h1>
                </Wrap>
              }
            />
          </Switch>
        </main>
      </div>
    </>
  );
}

export { SecureMessageListView };
