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
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(Status.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");


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
  }]).then(async (answers: InquirerAnswers) => {
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }, {
          name: 'age',
          type: 'number',
          message: 'Enter age',
        }]);
        users.add(user);
        break;
      case Action.Remove:
        const name = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }]);
        users.remove(name.name);
        break;
      case Action.Quit:
        Message.showColorized(Status.Info, "Bye bye!");
        return;
      default:
        Message.showColorized(Status.Error, "Command not found");
        break;
    }

    startApp();
  });
}


startApp();
