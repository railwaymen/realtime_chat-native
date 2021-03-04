import React, {useState, useEffect} from 'react';

import BasicAuthImage from '../../shared/basic-auth-image';
import Placeholder from '../../shared/placeholder';

export default function AvatarPlaceholder({
  url = '',
  iconColor,
  iconSize,
  containerStyle = {},
  imageKey,
}) {
  const [displayImage, setDisplayImage] = useState(Boolean(url));

  useEffect(() => {
    setDisplayImage(Boolean(url));
  }, [url]);

  return displayImage && url ? (
    <BasicAuthImage
      url={url}
      style={containerStyle}
      setDisplayImage={setDisplayImage}
      imageKey={imageKey}
    />
  ) : (
    <Placeholder
      iconColor={iconColor}
      iconSize={iconSize}
      containerStyle={containerStyle}
    />
  );
}
