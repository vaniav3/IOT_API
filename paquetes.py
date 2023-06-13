import requests
import json
import time
import random

while True:
    humidity = round(random.uniform(0, 20), 2)
    temperature = round(random.uniform(0, 20), 2)
    solar_radiation = round(random.uniform(0, 10), 2)
    solar_heat = round(random.uniform(0, 10), 2)

    data = {
        "sensor_api_key": "f40ea0ff-e0a5-4848-a067-e5a42437d5d7",
        "json_data": [
            {
                "humidity": humidity,
                "temperature": temperature,
                "solar_radiation": 0,
                "solar_heat": 0
            },
            {
                "humidity": 0,
                "temperature": 0,
                "solar_radiation": solar_radiation,
                "solar_heat": solar_heat
            }
        ]
    }

    url = "https://api-iot.juliobarra.cl/api/v1/sensor_data"

    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json.dumps(data), headers=headers)

    if response.status_code == 201:
        print("Solicitud enviada correctamente, response : ", response.text)
    else:
        print("Error al enviar la solicitud:", response.text)

    time.sleep(30)
 