import ResponseErrorModel from '../models/response-error-model';

const CheckResponse = async (response) => {
  const {status} = response;

  if (status === 204) {
    return true;
  } else if (status >= 200 && status < 400) {
    return response.json();
  } else if ([401, 403].includes(status)) {
    //logout

    throw new ResponseErrorModel({
      message: ['unauthorized'],
      name: 'Unauthorized',
      status: status,
    });
  } else if (status >= 400 && status < 500) {
    const json = await response.json();

    throw new ResponseErrorModel({
      message: json.errors,
      name: 'UnprocessableEntity',
      status: status,
      fullMessage: json,
      response,
    });
  }
};

export default CheckResponse;
