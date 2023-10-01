from opcua import Client
# Create a client instance
client = Client("opc.tcp://26.107.113.149:4840/opcua/")
try:
 # Connect to the server
 client.connect()
 # Browse for temperature and pressure nodes
 temperature_node = client.get_node("ns=2;i=2")
 pressure_node = client.get_node("ns=2;i=3")
 # Read node values
 while True:
  temperature_value = temperature_node.get_value()
  pressure_value = pressure_node.get_value()
  print("Temperature: {} °C".format(temperature_value))
  print("Pressure: {} kPa".format(pressure_value))
finally:
# Disconnect the client
 client.disconnect()