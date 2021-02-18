import BasicAuth from './basic-auth';

export default defineFetchProp = ({method, token}) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Token: token,
    ...BasicAuth(),
  },
});
