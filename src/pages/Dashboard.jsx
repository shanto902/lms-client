import { DeliveredProcedureOutlined, HddOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import useMyCourses from "../hooks/useMyCourses";
import useEnrolledCourses from "../hooks/useEnrolledCourses";

const Dashboard = () => {
  const { courses } = useMyCourses();
  const { courses: enrolled } = useEnrolledCourses();

  return (
    <div style={{ margin: 50 }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="My Written Course"
              value={courses?.length}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<DeliveredProcedureOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="My Enrolled Course"
              value={enrolled?.length}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<HddOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
