const mongoose = require('mongoose');
const serverDataSchema = mongoose.Schema({
    serverId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Server',
      required: [true, 'Data must belong to a server'],
    },
    data: [
      {
        variableNode: [
          {
            dataName: String,
            dataSource: [
              {
                dataValue: String,
                timeStamp: String,
              },
            ],
          },
        ],
      },
    ],
  });
  




serverDataSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'serverId',
        select: 'serverEndPoint userId accessId'
    });
    next();
});


const serverData = mongoose.model("serverData", serverDataSchema);

module.exports = serverData;