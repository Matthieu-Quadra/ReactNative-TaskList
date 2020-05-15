import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { APP_COLORS } from '../../styles/color';
import { style } from './style';

const ButtonAddTask = ({ onAddTaskClickCallBack }) => (
    <View style={style.add}>
        <Icon
        raised
        name='ios-add'
        type='ionicon'
        color={APP_COLORS.primaryAction}
        onPress={() => onAddTaskClickCallBack({}, 'Ajouter une tâche', '', false)}
        />
    </View>    
);

export default ButtonAddTask;
