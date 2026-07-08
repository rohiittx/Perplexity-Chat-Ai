import mongoose from "mongoose"

const { Schema, model } = mongoose

const chatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    trim: true,
    default: "New Conversation",
  },
}, {
  timestamps: true,
})

const chatModel = mongoose.model("Chat", chatSchema)

export default chatModel
