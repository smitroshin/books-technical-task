import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
const RouteWithSubRoutes = (props) => (
  <Route
    path={props.path}
    render={(routeProps) => {
      if (props.redirectTo) return <Redirect to={props.redirectTo} />;
      if (props.public) return <props.component {...routeProps} {...props} />;
      return <Redirect to="/" />;
    }}
  />
);

RouteWithSubRoutes.defaultProps = {
  path: '',
  redirectTo: '',
  public: false,
};

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string,
  redirectTo: PropTypes.string,
  public: PropTypes.bool,
};

export default RouteWithSubRoutes;
