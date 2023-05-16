const inquirer = require('inquirer');
const consola = require('consola')

enum Status {
  Success = "success",
  Error = "error",
  Info = "info"
}

class Message {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  show() {
    console.log(this.content)
  }

  capitalize() {
    this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase()
  }

  toLowerCase() {
    this.content = this.content.toLowerCase();
  }

  toUpperCase() {
    this.content = this.content.toUpperCase();
  }

  static showColorized(status: Status, text: string) {
    consola[status](text)
  }
}

interface User {
  name: string;
  age: number
}

class UsersData {
  data: User[] = [];

  showAll() {
    Message.showColorized(Status.Info, 'Users data')
    if (this.data && this.data.length > 0) {
      console.table(this.data)
    } else {
      console.log('No data')
    }
  }

  add(user: User): void {
    if (user.age > 0 && user.name.length > 0) {
      this.data.push(user)
      Message.showColorized(Status.Success, 'User has been successfully added!')
    } else {
      Message.showColorized(Status.Error, 'Wrong data!')
    }

  }

  remove(userName: string): void {
    const index: number = this.data.findIndex(user => user.name === userName);
    if (index !== -1) {
      this.data.splice(index, 1)
      Message.showColorized(Status.Success, 'User deleted!')
    } else {
      Message.showColorized(Status.Error, 'User not found!')
    }
  }
}

const users = new UsersData();
users.showAll();
users.add({ name: "Jan", age: 20 });
users.add({ name: "Adam", age: 30 });
users.add({ name: "Kasia", age: 23 });
users.add({ name: "Basia", age: -6 });
users.showAll();
users.remove("Maurycy");
users.remove("Adam");
users.showAll();


enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
}

type InquirerAnswers = {
  action: Action
}

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
    // choices: [Action.List, Action.Add, Action.Remove, Action.Quit]
  }]).then(async (answers: InquirerAnswers) => {
    console.log("Chosen action: " + answers.action);
    if (answers.action !== "quit")
      startApp();
  });
}

startApp();
