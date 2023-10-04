let updateCounter = 0;
    const dataToUpdate = [];

    const updateInterval = setInterval(async () => {
      if (updateCounter >= 10) {
        clearInterval(updateInterval);

        // Update the database with all data points
        await Server.findByIdAndUpdate(
          newServer._id,
          { $push: { data: { $each: dataToUpdate } } },
          { new: true, runValidators: true }
        );

        server.shutdown(() => {
          console.log('Server stopped after sending 10 data values.');
          // process.exit(0);
        });
        return;
      }

      const temperatureValue = Math.random() * 50 + 20;
      

      const obj = {
        dataName: dataName,
        dataValue: temperatureValue,
        timeStamp: new Date(),
      };

      // Store data for bulk update
      dataToUpdate.push(obj);

      temperatureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: temperatureValue }));
      

      updateCounter++;
    }, 5000);