import express from "express";

const app = express();
app.use(express.json());

let users = []; // Temporary in-memory storage

// Create User
app.post("/create", (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please enter the name",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter the email",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter the password",
      });
    }

    users.push({ ...req.body, id: users.length + 1 });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to create the user",
    });
  }
});

// Get All Users
app.get("/users", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Users data fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to get the users",
    });
  }
});

// Get Single User
app.get("/users/:id", (req, res) => {
  try {
    const user = users.find((u) => u.id == req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch the user",
    });
  }
});

// Update User
app.put("/update/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields (only if provided in request)
    users[index] = { ...users[index], ...req.body };

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: users[index],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update the user",
    });
  }
});

// Delete User
app.delete("/delete/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const deletedUser = users.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete the user",
    });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
