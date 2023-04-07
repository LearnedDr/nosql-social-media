const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
          thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        //   username?
    },
    {
        toJSON: {
          getters: true,//I think this is the getter for timestamp on date
        },
        id: false,
      }
);

 // **Thought**:

// * `thoughtText`
// * String
// * Required
// * Must be between 1 and 280 characters

// * `createdAt`
// * Date
// * Set default value to the current timestamp
// * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
// * String
// * Required

// * `reactions` (These are like replies)
// * Array of nested documents created with the `reactionSchema`