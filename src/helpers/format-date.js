import moment from 'moment';

const formatDate = (date) => {
  const timeNow = moment();
  const oldTime = moment(date);

  if (timeNow.startOf('day') >= oldTime && timeNow.endOf('day') <= oldTime) {
    return oldTime.format('HH:MM');
  } else if (timeNow.subtract(2, 'days') < oldTime) {
    return moment(oldTime).fromNow();
  }

  return oldTime.format('DD/MM/YYYY');
};

export default formatDate;
