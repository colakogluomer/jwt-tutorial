const Todo = require("../models/Todo");
const BaseService = require("./BaseService");
const ApiError = require("../utils/ApiError");
const userService = require("./UserService");

class TodoService extends BaseService {
  async addTodo(userId, author, title, description) {
    try {
      console.log(userId);
      const user = await userService.find(userId);
      console.log(user);
      const createdTodo = await this.insert({ author, title, description });
      user.todos.push(createdTodo);
      await user.save();
      return createdTodo;
    } catch (error) {
      throw new ApiError(400, "Something went wrong.");
    }
  }
  async findTodos(userId) {
    try {
      const user = await userService.find({ _id: userId });
      return user.todos;
    } catch (error) {
      throw new ApiError(400, "Something went wrong.");
    }
  }
}
module.exports = new TodoService(Todo);
