const actionSheetButtonsProp = ({
  isMessagePressed = false,
  onPressFirstOption,
  onPressSecondOption,
  changeActionSheetState,
}) => {
  const {firstButtonTitle, secondButtonTitle} = isMessagePressed
    ? {firstButtonTitle: 'Edit', secondButtonTitle: 'Delete'}
    : {firstButtonTitle: 'Camera', secondButtonTitle: 'Gallery'};

  return [
    {
      id: 0,
      title: firstButtonTitle,
      onPress: onPressFirstOption,
    },
    {
      id: 1,
      title: secondButtonTitle,
      onPress: onPressSecondOption,
    },
    {
      id: 2,
      title: 'Cancel',
      onPress: changeActionSheetState,
    },
  ];
};
export default actionSheetButtonsProp;
