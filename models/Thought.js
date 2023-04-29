const { Schema, model } = require('mongoose');
const Reactions = require("Reaction")

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,//maybe capital L(research minimum length)
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reactions]
  },
  {
    toJSON: {
      getters: true,//I think this is the getter for timestamp on date
    },
    id: false,
  }
);

const Thought = model("Thought", thoughtSchema)
module.exports = Thought; 

