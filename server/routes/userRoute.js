const router = require("express").Router();
const passport = require("passport");
const UserService = require("../services/UserService");
const TodoService = require("../services/TodoService");

//Register Router
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, date } = req.body;
    console.log(name);
    const newUser = await UserService.register({ name, email, password, date });
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});
//Login Router
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.login({ email, password });
    res.send(token);
  } catch (error) {
    next(error);
  }
});
router.get(
  "/:id/todos",
  // passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const todos = await TodoService.findTodos(userId);
      res.send(todos);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/todos/add",
  // passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const { author, title, description } = req.body;
      const createdTodo = await TodoService.addTodo(
        userId,
        author,
        title,
        description
      );

      res.send(createdTodo);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
