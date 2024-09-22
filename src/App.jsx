// App.jsx
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import responseData from "./data/response.json";
import { Box, Paper, Typography } from "@mui/material";

function App() {
  const [fuelData, setFuelData] = useState([]);

  // Load the data from the response file
  useEffect(() => {
    setFuelData(responseData);
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleTimeString()}`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5", 
        overflow: "auto", 
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          width: "90%",
          maxWidth: "1000px", 
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}
        >
          Fuel Consumption
        </Typography>

        {/* Chart rendering */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={fuelData}
            margin={{ top: 5, right: 30, left: 20, bottom: 30 }} 
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTimestamp} 
              angle={-45} 
              textAnchor="end"
              height={60} 
            />
            <YAxis 
              yAxisId="left" 
              label={{ value: 'Fuel Level', angle: -90, position: 'insideLeft' }} 
              domain={['auto', 'auto']}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              label={{ value: 'Speed', angle: 90, position: 'insideRight' }} 
              domain={['auto', 'auto']}
            />
            <Tooltip labelFormatter={formatTimestamp} />
            <Legend verticalAlign="top" height={36} />

            {/* Red Line - Fuel Level */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="fuel_level"
              stroke="#ff4d4d" // Red line color
              activeDot={{ r: 8 }}
              dot={false}
            />
            
            {/* Green Line - Speed */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="speed"
              stroke="#4caf50" // Green line color
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default App;
