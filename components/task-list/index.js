import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { APP_COLORS } from '../../styles/color';
import { style } from './style';
import { TASK } from '../../model';

const TaskList = ({ taskList, onPressCallBack, onLongPressCallBack }) => (
   <View style={style.list}>
       {taskList.map(task => 
        <ListItem 
            key={task.id} 
            title={task.content} 
            bottomDivider 
            chevron 
            badge={{ value: task.status, 
                containerStyle: { marginTop: 0 }, 
                badgeStyle: task.status === TASK.todoStatus
                    ? { backgroundColor: APP_COLORS.accent }
                    : { backgroundColor: APP_COLORS.lightPrimaryColor }
            }}   
            onPress={() => onPressCallBack(task)}
            onLongPress={() => onLongPressCallBack(task, 'Renommer une tâche', task.content, true)}
        />
                    )
        }
   </View>
);

export default TaskList;
