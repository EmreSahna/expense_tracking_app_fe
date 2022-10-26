import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { AppState } from "../store";
import { SketchPicker } from "react-color";
import { DeleteOutlined , EditOutlined } from "@ant-design/icons";
import { Mode } from "../types/general";

const emptyFrom :CategoryForm = {
  name: "",
  type: "income",
  color: ""
}

export default function Categories() {
    const {data, loading, error} = useSelector((state: AppState) => state.categories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<Mode>("new");
    const [form, setForm] = useState<CategoryForm>(emptyFrom);
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const showModal = (mode: Mode) => {
      setIsModalOpen(true);
      setMode(mode);
    };

    const handleOk = () => {
      if(mode === "new") dispatch(addCategory(form) as any);
      else if(mode === "edit" && typeof updateId === 'number') dispatch(updateCategory(form, updateId) as any);
      else if(mode === "delete" && typeof deleteId === 'number') dispatch(deleteCategory(deleteId) as any);
      setIsModalOpen(false);
      setMode("new");
      setForm(emptyFrom);
      setUpdateId(null);
      setDeleteId(null);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setMode("new");
      setForm(emptyFrom);
      setUpdateId(null);
      setDeleteId(null);
    };

    const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string,category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditOutlined style={{ color:"blue"}} 
          onClick={() => {
            showModal("edit");
            setForm(category);
            setUpdateId(category.id);
          }} />
          <DeleteOutlined style={{ color:"red"}} 
            onClick={() => {
            showModal("delete");
            setDeleteId(category.id);
            }}
          />
        </Space>
      ),
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories() as any);
  }, [])
  

  return (
    <>
      <div>
          <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button type="primary" onClick={() => showModal("new")}>
            New Category
          </Button>
        </div>
        <Modal title={mode === "new" ? "Create New Category" : mode === "edit" ? "Update Category" : "Delete Category"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{disabled: !(mode === "delete") && !form.name}}>
        {mode === "edit" || mode === "new" ? ( 
          <Form labelCol={{span: 8}} wrapperCol={{span: 16}}>
          <Form.Item label="Category Name" required>
            <Input name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </Form.Item>
          <Form.Item label="Category Type">
            <Select defaultValue={form.type} value={form.type} onChange={type => setForm({...form, type})}>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Color">
            <SketchPicker color={form.color} onChange={color => setForm({...form, color: color.hex})}/>
          </Form.Item>
          </Form>
        ) : mode === "delete" ? (
          <>Are you sure?</>
        ) : null}
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} rowKey="id"/>
    </>
  )
}
