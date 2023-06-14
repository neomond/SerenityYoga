import {TouchableOpacity, View} from 'react-native';

export function RadioButton(props: any) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: props.selected ? '#815CFF' : '#353535',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.selected ? '#815CFF' : 'transparent',
          },
          props.style,
        ]}>
        {props.selected && (
          <View
            style={{
              height: 8,
              width: 8,
              borderRadius: 6,
              backgroundColor: '#FFF',
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
