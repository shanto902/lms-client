import { Button, Space, Table } from "antd";
const columns = [
  {
    title: "Course Title",
    dataIndex: "title",
    key: "courseTitle",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Instructor Name",
    dataIndex: "instructorName",
    key: "instructorName",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button>Buy {record.title}</Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    title: "John Brown",
    price: 32,
    description: "New York No. 1 Lake Park",
    instructorName: "Ashiq",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const ViewAllCourses = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default ViewAllCourses;
