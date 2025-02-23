import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const currentUserId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: userToChatId, receiverId: currentUserId },
        { senderId: currentUserId, receiverId: userToChatId },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const currentUserId = req.user._id;
    const { text, image } = req.body;

    let imageLink;
    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageLink = result.secure_url;
    }

    const newMessage = new Message({
      senderId: currentUserId,
      receiverId: userToChatId,
      text,
      image: imageLink,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(userToChatId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
