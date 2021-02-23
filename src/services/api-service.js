import {API_SERVER_PATH, API_SUFFIX} from '@env';

import defineFetchProp from '../helpers/define-fetch-prop';
import CheckResponse from '../errors/check-response';

export default class ApiService {
  static basicRequest({
    method = 'GET',
    url,
    token = '',
    body,
    additionalHeaderParams,
    isStringify = true,
  }) {
    const path = `${API_SERVER_PATH}${API_SUFFIX}${url}`;

    const basicFetchProp = defineFetchProp({
      method,
      token,
      additionalHeaderParams,
    });

    const preparedBody = isStringify ? JSON.stringify(body) : body;

    const fetchProp = body
      ? {...basicFetchProp, body: preparedBody}
      : basicFetchProp;

    return fetch(path, fetchProp).then((response) => {
      const {method, headers, body} = fetchProp;
      console.log(
        `
          ${method} - ${path},
          BODY - ${body},
          HEADERS - ${JSON.stringify(headers)}
          RESPONSE STATUS - ${response.status}
        `,
      );
      return CheckResponse(response);
    });
  }
}
