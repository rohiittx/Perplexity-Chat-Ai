import mongoose from "mongoose"

const { Schema, model } = mongoose

const messageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "ai"],
    default: "user",
  },
}, {
  timestamps: true,
})

const messageModel = mongoose.model("Message", messageSchema)

export default messageModel
