import { Bar, Line, Pie } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  BarElement,
  ArcElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Colors,
} from "chart.js";
import { Card, Col, MenuProps, Row, Statistic } from "antd";
import {
  CloseCircleOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const AdminDashboard = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Colors,
    Tooltip,
    Legend
  );

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const options = {};

  const data = {
    labels: [
      "labels",
      "labels1",
      "labels2",
      "labels3",
      "labels4",
      "labels5",
      "labels6",
      "labels7",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)", // Darker red with higher alpha
          "rgba(54, 162, 235, 0.6)", // Darker blue with higher alpha
          "rgba(255, 206, 86, 0.4)", // Darker yellow with lower alpha
          "rgba(75, 192, 192, 0.7)", // Darker green with higher alpha
          "rgba(153, 102, 255, 0.4)", // Darker purple with lower alpha
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        tension: 0.1,
      },
    ],
  };

  return (
    <Row gutter={[24, 32]}>
      <Col xs={24} lg={8}>
        <Card
          style={{
            backgroundColor: "#88E975",
            color: "white",
            boxShadow: "5px",
          }}
          size="small"
        >
          <Statistic
            title="New Users (This Week)"
            value={112893}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} lg={8}>
        <Card size="small" style={{ backgroundColor: "#E9ED41" }}>
          <Statistic
            title="Reported Posts (Total)"
            value={112893}
            prefix={<WarningOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} lg={8}>
        <Card size="small" style={{ backgroundColor: "#65DEE1" }}>
          <Statistic
            title="Unapproved Posts (Total)"
            value={112893}
            prefix={<CloseCircleOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        {/* for finding new users */}
        <Card>
          <Line data={data} />
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        {/* for finding unapproved posts */}
        <Card>
          <Bar
            data={data}
            options={{
              plugins: {
                colors: {
                  enabled: true,
                },
              },
            }}
          />
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        {/* for number of new users */}
        <Card>
          <Pie
            data={data}
            options={{
              plugins: {
                colors: {
                  enabled: false,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default AdminDashboard;
