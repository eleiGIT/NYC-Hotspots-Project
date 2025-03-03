import pandas as pd

#Read data
freewifi_data = pd.read_csv("data/hotspots.csv")
#Select necessary columns
columns = ['Location', 'Longitude', 'Latitude', 'Name', 'City', 'SSID', 'Postcode', 'Type', 'Provider']
filtered_wifi_data = freewifi_data[columns]

#Output the data
output_filename = 'filtered_hotspots.csv'
filtered_wifi_data.to_csv(output_filename, index=False)
print(f"Filtered CSV file saved as '{output_filename}'")