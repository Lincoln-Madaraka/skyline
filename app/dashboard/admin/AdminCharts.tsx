"use client";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

const palette = {
  wood: "#8a6a48",
  olive: "#6b6a3a",
  charcoal: "#2b2a28",
  sand: "#e8ddc9",
  stone: "#bbb2a3",
  ink: "#1c1b19",
};

const pieColors = [palette.wood, palette.olive, palette.charcoal, palette.stone, "#c29a6c", "#9b9a5a", "#d4a976", "#7a7942"];

type Props = {
  userSeries: { date: string; users: number }[];
  inquirySeries: { date: string; inquiries: number }[];
  propertySeries: { date: string; properties: number }[];
  areaChart: { area: string; count: number }[];
  typeChart: { type: string; count: number }[];
};

export default function AdminCharts({ userSeries, inquirySeries, propertySeries, areaChart, typeChart }: Props) {
  const merged = userSeries.map((d, i) => ({
    date: d.date,
    users: d.users,
    inquiries: inquirySeries[i]?.inquiries ?? 0,
    properties: propertySeries[i]?.properties ?? 0,
  }));

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">Activity — Last 30 Days</h2>
            <p className="panel-sub">New users, inquiries, and property listings per day.</p>
          </div>
        </div>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <AreaChart data={merged} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.wood} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={palette.wood} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gInq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.olive} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={palette.olive} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gProp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.charcoal} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={palette.charcoal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(43,42,40,0.06)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(28,27,25,0.45)" fontSize={11} tickLine={false} axisLine={false} interval={4} />
              <YAxis stroke="rgba(28,27,25,0.45)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(43,42,40,0.1)", borderRadius: 6, fontSize: 13 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Area type="monotone" dataKey="users" stroke={palette.wood} fill="url(#gUsers)" strokeWidth={2} />
              <Area type="monotone" dataKey="inquiries" stroke={palette.olive} fill="url(#gInq)" strokeWidth={2} />
              <Area type="monotone" dataKey="properties" stroke={palette.charcoal} fill="url(#gProp)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-grid-2">
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2 className="panel-title">Properties by Area</h2>
              <p className="panel-sub">Where your inventory is concentrated.</p>
            </div>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={areaChart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="rgba(43,42,40,0.06)" vertical={false} />
                <XAxis dataKey="area" stroke="rgba(28,27,25,0.5)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(28,27,25,0.5)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(43,42,40,0.1)", borderRadius: 6, fontSize: 13 }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} fill={palette.wood} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <h2 className="panel-title">Inventory by Type</h2>
              <p className="panel-sub">Breakdown of property categories.</p>
            </div>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={typeChart} dataKey="count" nameKey="type" innerRadius={55} outerRadius={95} paddingAngle={2}>
                  {typeChart.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(43,42,40,0.1)", borderRadius: 6, fontSize: 13 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
