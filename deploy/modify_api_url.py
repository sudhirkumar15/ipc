""" Modify the qa url of the microservices to locally run 
services """

import json

SITECONFIG = "src/siteconfig.json"

with open(SITECONFIG, "r") as jsonFile:
    data = json.load(jsonFile)

data["data"]["domain"] = "http://localhost:3000"

with open(SITECONFIG, "w") as jsonFile:
    json.dump(data, jsonFile)
