import {API_SERVER_PATH, API_SUFFIX} from '@env';

import defineFetchProp from '../helpers/define-fetch-prop';
import CheckResponse from '../errors/check-response';

export default class ApiService {
  static basicRequest({method = 'GET', url, token = '', body}) {
    const path = `${API_SERVER_PATH}${API_SUFFIX}${url}`;

    const basicFetchProp = defineFetchProp({method, token});

    const fetchProp = body
      ? {...basicFetchProp, body: JSON.stringify(body)}
      : {...basicFetchProp};

    return fetch(path, fetchProp).then((response) => {
      const {method, headers, body} = fetchProp;
      console.log(
        `
          ${method} - ${path},
          BODY - ${body},
          HEADERS - ${JSON.stringify(headers)}
        `,
      );
      return CheckResponse(response);
    });
  }
}
