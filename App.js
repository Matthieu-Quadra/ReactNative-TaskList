import React from 'react';
import lodash from 'lodash';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import Header from './components/header/index';
import TaskList from './components/task-list';
import ButtonAddTask from './components/button-add-task';
import MenuTask from './components/menu-task';
import { TASK } from './model';
import TextPrompt from './components/text-prompt';
import { style } from './styles/styles.js';

const taskList = [];

const storageKey = 'taskList';


export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        myText: 'Mon premier Texte',
        taskList,
        isMenuTaskVisible: false,
        currentTask: {},
        isTextPromptVisible: false,
        idGenerator: 0,
        titleTextPrompt: '', 
        textTextPrompt: '',
        modifyTextmode: false
      };
  }
  componentWillMount = () => {
    AsyncStorage.getItem(storageKey).then(storedTaskList => {
      if (storedTaskList) {
        this.setState({ taskList: JSON.parse(storedTaskList) }, () => {
          this.setState({ 
            idGenerator: this.state.taskList[this.state.taskList.length - 1].id + 1 });
        });
      }
    });
  };
  onPressFunction = () => {
    this.setState({ myText: 'Salut les gars' });
    console.log('on press');
  }

  displayMenyTask = (taskcontent) => {
    console.log('callback', taskcontent);
  }

  toggleMenuTaskVisibility = (task) => {
    let currentTask = task;
    if (this.state.isMenuTaskVisible) {
      currentTask = {};
    }
    this.setState({ isMenuTaskVisible: !this.state.isMenuTaskVisible, currentTask });
  };

  deleteCurrentTask = () => {
    const index = lodash.findIndex(this.state.taskList, { id: this.state.currentTask.id });
    const list = this.state.taskList;
    list.splice(index, 1);
    this.setState({ taskList: list, currentTask: {} }, () => {
      this.saveTaskList();
      this.toggleMenuTaskVisibility();
    });
  };

  changeStatusCurrentTask = () => {
    const index = lodash.findIndex(this.state.taskList, { id: this.state.currentTask.id });
    const updatedTask = this.state.currentTask;
    updatedTask.status = (this.state.currentTask.status === TASK.todoStatus ? 
                            TASK.doneStatus : TASK.todoStatus);
    const updatedTaskList = this.state.taskList;
    updatedTaskList[index] = updatedTask;
    this.setState({ 
      taskList: updatedTaskList, 
      currentTask: {} }, 
      () => {
        this.saveTaskList();
        this.toggleMenuTaskVisibility();
      });
  };

  toggleTextPromptVisibility = (task, titleTextPrompt, textTextPrompt, modifyTextmode) => {
    console.log('par icic');
    this.setState({ 
      isTextPromptVisible: !this.state.isTextPromptVisible, 
      currentTask: task, 
      titleTextPrompt, 
      textTextPrompt,
      modifyTextmode });
  };

  addTask = (value) => {
    if (!value) { 
      return (this.setState({ titleTextPrompt: 'Saisir un texte !' }));
    }
    if (this.state.modifyTextmode) {
      const index = lodash.findIndex(this.state.taskList, { id: this.state.currentTask.id });
      const updatedTask = this.state.currentTask;
      updatedTask.content = value;
      const updatedTaskList = this.state.taskList;
      updatedTaskList[index] = updatedTask;
      this.setState({ taskList: updatedTaskList, currentTask: {} }, () => {
        this.saveTaskList();
      });
    } else {
      const addedTask = { id: this.state.idGenerator, content: value, status: TASK.todoStatus };
      this.setState({ taskList: [...this.state.taskList, addedTask], 
        idGenerator: this.state.idGenerator + 1 }, () => {
          this.saveTaskList();
        });  
    }
    this.toggleTextPromptVisibility();
  }; 

  saveTaskList = () => {
    AsyncStorage.setItem(storageKey, JSON.stringify(this.state.taskList));
  };

  renderTaskList = () => {
    if (this.state.taskList.length > 0) {
      return (<TaskList 
      onPressCallBack={this.toggleMenuTaskVisibility} 
      taskList={this.state.taskList} 
      onLongPressCallBack={this.toggleTextPromptVisibility}
      />);
    }
      return (
        <View style={style.textNoTask}>
          <Text>
            Cliquez sur le bouton + pour ajouter une tâche
          </Text>
        </View>
      );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header content="Liste des tâches" />
        <ScrollView>
          {this.renderTaskList()}
        </ScrollView>
        <MenuTask 
          isVisible={this.state.isMenuTaskVisible} 
          onDisapearCallBack={this.toggleMenuTaskVisibility} 
          onDeleteCallBack={this.deleteCurrentTask}
          onChangeStatusCallBack={this.changeStatusCurrentTask}
        />
        <ButtonAddTask onAddTaskClickCallBack={this.toggleTextPromptVisibility} />
        <TextPrompt 
          titleTextPrompt={this.state.titleTextPrompt}
          textTextPrompt={this.state.textTextPrompt}
          isVisible={this.state.isTextPromptVisible}
          onSubmitBtnCallBack={this.addTask}
          onCancelBtnCallBack={this.toggleTextPromptVisibility}
        />
      </View>
    );
  }
}
