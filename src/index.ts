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

const msg = new Message("heLlo world!");
msg.show(); // "heLlo world!"
msg.capitalize();
msg.show(); // "Hello world!"
msg.toLowerCase();
msg.show(); // "hello world!"
msg.toUpperCase();
msg.show(); // "HELLO WORLD!"
Message.showColorized(Status.Success, "Test"); // √ "Test"
Message.showColorized(Status.Error, "Test 2"); // "x Test 2"
Message.showColorized(Status.Info, "Test 3"); // ℹ "Test 3"



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
