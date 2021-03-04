import React, {useState, useContext} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

import mainColors from '../../styles/main-colors';
import roomTypes from '../../helpers/room-types';
import TypeButton from '../../components/create-new-room/type-button';
import NewRoomContext from '../../context/new-room-context';

import CustomButtom from '../../shared/custom-buttom';

export default function RoomTypeScreen({navigation: {navigate}}) {
  const {
    newRoom: {type = ''},
    assignNewRoomAttribiutes,
  } = useContext(NewRoomContext);

  const [selectedType, setSelectedType] = useState(type);

  const onPress = () => {
    assignNewRoomAttribiutes({type: selectedType});

    if (selectedType === 'direct') {
      return navigate('RoomMembersScreen');
    }
    return navigate('RoomNameScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {roomTypes.map(({name, value}, index) => (
          <TypeButton
            key={index}
            name={name}
            onPress={() => setSelectedType(value)}
            selectedType={selectedType}
            value={value}
          />
        ))}
      </View>
      <CustomButtom title="Confirm" onPress={onPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.black,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  contentContainer: {
    flexDirection: 'column',
    flex: 1,
  },
});
