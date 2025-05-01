import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    apiResponse.created(res, newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    apiResponse.errorISE(res);
  }
};

export const getMessages = async (req, res) => {
  try {
    // Extract chat partner ID from route params
    const { id: userToChatId } = req.params;

    // Get authenticated user's ID from request
    const senderId = req.user._id;

    // Fetch conversation containing both participants and populate messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    // Return empty array when conversation does not exist
    if (!conversation) return res.status(200).json([]);

    // Extract messages from the conversation document
    const messages = conversation.messages;

    // Return conversation messages with success response
    res.status(200).json(messages);
  } catch (error) {
    // Log error and return internal server error response
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};