import BasicAuth from './basic-auth';

export default defineFetchProp = ({
  method,
  token,
  additionalHeaderParams = {},
}) => ({
  method,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Token: token,
    ...additionalHeaderParams,
    ...BasicAuth(),
  },
});
