import ImagePicker from 'react-native-image-crop-picker';

export default function imagePickerAction(selectedOption = 'picker') {
  switch (selectedOption) {
    case 'camera':
      return ImagePicker.openCamera({
        width: 100,
        height: 100,
        cropping: true,
      });

    case 'picker':
      return ImagePicker.openPicker({
        width: 100,
        height: 100,
        cropping: true,
      });
  }
}
