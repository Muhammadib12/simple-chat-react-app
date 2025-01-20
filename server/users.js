const users = [];

export const addUser = ({ id, name, room }) => {
  // Trim and normalize inputs
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Check for existing user in the same room
  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (existingUser) {
    return { error: "Username is already taken" };
  }

  const user = { id, name, room };

  // Add user to the list
  users.push(user);

  return { user };
};

export const removeUser = (id) => {
  // Find the index of the user to be removed
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    // Remove and return the user
    return users.splice(index, 1)[0];
  }

  return null; // Return null if the user wasn't found
};

export const getUser = (id) => {
  // Find and return the user by ID
  return users.find((user) => user.id === id);
};

export const getUsersInRoom = (room) => {
  // Find and return all users in a specific room
  return users.filter((user) => user.room === room);
};

// No need for a default export when named exports are used
