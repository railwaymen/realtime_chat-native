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
      name: 'Unauthorized',
      status: status,
      message: ['unauthorized'],
    });
  } else if (status >= 400 && status < 500) {
    const json = await response.json();
    const [errorMessage] = json.errors.name;
    throw new ResponseErrorModel({
      name: 'UnprocessableEntity',
      status: status,
      message: errorMessage,
    });
  }
};

export default CheckResponse;
