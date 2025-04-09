"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", wheat: 65, corn: 78, soybeans: 55 },
  { name: "Feb", wheat: 70, corn: 82, soybeans: 58 },
  { name: "Mar", wheat: 75, corn: 85, soybeans: 62 },
  { name: "Apr", wheat: 72, corn: 80, soybeans: 60 },
  { name: "May", wheat: 68, corn: 75, soybeans: 57 },
  { name: "Jun", wheat: 64, corn: 72, soybeans: 54 },
]

export default function FarmMetricsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="wheat" stroke="#16a34a" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="corn" stroke="#eab308" />
        <Line type="monotone" dataKey="soybeans" stroke="#0ea5e9" />
      </LineChart>
    </ResponsiveContainer>
  )
}
