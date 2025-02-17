import pandas as pd

#Read data
freewifi_data = pd.read_csv("data/hotspots.csv")

#Sort data alphabetically
freewifi_data = freewifi_data.sort_values(by="Location", ascending=True)

print(freewifi_data)