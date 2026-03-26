const handleAsync = require("../../../utilities/handleAsync");
const MESSAGES = require("../../../helpers/messages");
const { readUsers, writeUsers } = require("../../../helpers/read_write_file");


const handleGetUsers = handleAsync(async (req, res) => {
  let users = await readUsers();
  const { search, sort, order = "asc" } = req.query;

  let searchInput = search ? search.toLowerCase() : "";

  if (!users.length) {
    return res.notFound({
      message: MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("user"),
    });
  }

  if (sort && !["name"].includes(sort)) {
    return res.badRequest({
      message: MESSAGES.apiErrorStrings.DATA_IS_INVALID(sort),
    });
  }

  if (order && !["asc", "desc"].includes(order)) {
    return res.badRequest({
      message: MESSAGES.apiErrorStrings.DATA_IS_INVALID(order),
    });
  }

  if (searchInput) {
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchInput) ||
        u.email.toLowerCase().includes(searchInput),
    );
  }

  if (sort) {
    if (sort === "name") {
      users.sort((a, b) =>
        order === "desc"
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name),
      );
    }
  }
  res.success(users);
});

const handleGetUserById = handleAsync(async (req, res) => {
  const ID = parseInt(req.params.id);

  if (isNaN(ID)) {
    return res.badRequest({
      message: MESSAGES.apiErrorStrings.DATA_IS_INVALID(ID),
    });
  }

  const users = await readUsers();
  const user = users.find((u) => u.id === ID);
  user
    ? res.success(user)
    : res.notFound({
        message: MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("user"),
      });
});

const handleCreateNewUser = handleAsync(async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.badRequest({
      message: MESSAGES.apiErrorStrings.DATA_IS_INVALID("user data"),
    });
  }

  const users = await readUsers();
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser = {
    id: newId,
    name,
    email,
    role: role || "User",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);
  res.successNewEntry(newUser);
});

const handleUpdateUser = handleAsync(async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, role } = req.body;

  let users = await readUsers();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.notFound({
      message: MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("User"),
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    role: role || users[userIndex].role,
    updatedAt: new Date().toISOString(),
  };

  await writeUsers(users);
  res.json(users[userIndex]);
  res.success({ message: MESSAGES.apiSuccessStrings.UPDATE(`User ${name}`) });
});

const handleDeleteUser = handleAsync(async (req, res) => {
  const userId = parseInt(req.params.id);
  const users = await readUsers();

  const userExists = users.some((u) => u.id === userId);
  if (!userExists) {
    return res.notFound({
      message: MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("User"),
    });
  }
  const updatedUsers = users.filter((u) => u.id !== userId);
  await writeUsers(updatedUsers);
  res.success({
    message: MESSAGES.apiSuccessStrings.DELETE(`User with userId ${userId}`),
  });
});

module.exports = {
  handleGetUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleUpdateUser,
  handleDeleteUser,
};
