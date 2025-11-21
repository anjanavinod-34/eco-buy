import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { viewPurchase } from "../services/allAPIs";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

export default function ImpactDashboard() {

  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    getPurchaseData();
  }, []);

  // Convert date into  Month Name
  const getMonthName = (dateString) => {
    if (!dateString) return "Month";

    const parts = dateString.split(/[-/]/); // split by - or /
    const month = Number(parts[1]);         // extract MM

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[month - 1] || "Month";
  };

  const getPurchaseData = async () => {
    try {
      const result = await viewPurchase();
      if (result.status === 200) {
        setPurchaseList(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // --------- GROUP BY MONTH (FIXED) ---------
  const groupByMonth = (data, key) => {
    const map = {};

    data.forEach(item => {
      const month = item.month;      // raw data ALREADY HAS month ✔
      const val = Number(item[key]) || 0;

      if (!map[month]) {
        map[month] = 0;
      }
      map[month] += val;             // sum values
    });

    return Object.keys(map).map(month => ({
      month,
      [key]: map[month]
    }));
  };

  // RAW → Before Grouping
  const carbonRaw = purchaseList.map(item => ({
    month: getMonthName(item.date),
    carbon: Number(item.carbonSaved) || 0
  }));

  const plasticRaw = purchaseList.map(item => ({
    month: getMonthName(item.date),
    plastic: Number(item.plasticSaved) || 0
  }));

  // FINAL GROUPED
  const carbonData = groupByMonth(carbonRaw, "carbon");
  const plasticData = groupByMonth(plasticRaw, "plastic");

  // Category Data
  const categoryMap = {};
  purchaseList.forEach(item => {
    if (!categoryMap[item.category]) categoryMap[item.category] = 0;
    categoryMap[item.category] += 1;
  });

  const categoryData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#e91e63"];

  return (
  <div className="" style={{backgroundColor:"beige"}}
  >
      <div className="mb-2 p-5">

      <div className="d-flex justify-content-between align-items-center mb-4 p-2">
        <Link to={'/'}>
          <img className='rounded-5' width={'100px'} height={'60px'} src={logo} alt="ecobuy logo" />

        </Link>
        <h2>Impact Dashboard</h2>
        <Link to={'/purchase'} className='me-4 btn' style={{ backgroundColor: "#2C5E1A", color: "white" }}>
          VIEW PURCHASES
        </Link>
      </div>

      {/* Summary */}
      <Row className="g-3 ">
        <Col md={4}>
          <Card className="shadow-sm p-3">
            <h6>Total Carbon Saved</h6>
            <h2 className="text-success">
              {purchaseList.reduce((t, i) => t + Number(i.carbonSaved || 0), 0).toFixed(1)} Kg
            </h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-3">
            <h6>Total Plastic Reduced</h6>
            <h2 className="text-primary">
              {purchaseList.reduce((t, i) => t + Number(i.plasticSaved || 0), 0).toFixed(1)} Kg
            </h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-3">
            <h6>Total Eco Purchases</h6>
            <h2 className="text-warning">{purchaseList.length} items</h2>
          </Card>
        </Col>
      </Row>

      {/* Carbon Chart */}
      <Row className="mt-4">
        <Col md={12}>
          <Card className="shadow-sm p-3">
            <h5>Carbon Saved Over Time</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={carbonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="carbon" stroke="#4caf50" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Plastic + Category */}
      <Row className="mt-4 g-3">
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <h5>Plastic Reduced (Monthly)</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={plasticData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="plastic" fill="#2196f3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm p-3" style={{ minWidth: 0 }}>
            <h5>Category-wise Eco Purchases</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                    {categoryData.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
  );
}
