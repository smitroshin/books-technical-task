import { memo, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import RouteWithSubRoutes from './routeWithSubRoutes';

const Router = (props) => (
  <Suspense fallback={null}>
    <Switch>
      {props.routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} {...props.propsForRoute} />
      ))}
    </Switch>
  </Suspense>
);

Router.defaultProps = {
  propsForRoute: {},
};

Router.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  propsForRoute: PropTypes.object,
};

export default memo(Router);
