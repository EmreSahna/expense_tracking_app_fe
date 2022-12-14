import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store"
import { getCategories } from "../store/actions/categoryActions";
import { addRecord, deleteRecord, getRecords, updateRecord } from "../store/actions/recordActions";
import { Category } from "../types/category";
import { Mode } from "../types/general";
import { Record, RecordForm } from "../types/record";

const emptyFrom :RecordForm = {
    title: "",
    amount: 0,
    category_id: 0
  }

export default function Records() {
    const {data, loading, error} = useSelector((state: AppState) => state.records);
    const {data: categories} = useSelector((state: AppState) => state.categories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<Mode>("new");
    const [form, setForm] = useState<RecordForm>(emptyFrom);
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const showModal = (mode: Mode) => {
        setIsModalOpen(true);
        setMode(mode);
    };

    const handleOk = () => {
        if(mode === "new") dispatch(addRecord(form) as any);
        else if(mode === "edit" && typeof updateId === 'number') 
            dispatch(updateRecord(form, updateId) as any);
        else if(mode === "delete" && typeof deleteId === 'number') 
            dispatch(deleteRecord(deleteId) as any);        
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
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          render: (amount: Record['amount']) => {
            return <>{Intl.NumberFormat('tr-TR',{style: "currency", currency:"TRY"}).format(amount)}</>;
          }
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (categories: Category, record: Record) => {
                return <Tag color={categories.color}>{categories.name.toUpperCase()}</Tag>;
            }
        },
        {
            title: "Last Update",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt: string) => {
                const date = new Date(updatedAt);
                return <>{date.toLocaleDateString()} {date.toLocaleTimeString("tr-TR",{hour: "2-digit", minute:"2-digit"})}</>
            }
        },
        {
          title: 'Action',
          key: 'action',
          render: (record: Record) => (
            <Space size="middle">
              <EditOutlined style={{ color:"blue"}} 
              onClick={() => {
                showModal("edit");
                setForm({
                    title: record.title,
                    amount: record.amount,
                    category_id: record.category.id
                });
                setUpdateId(record.id);
              }} />
              <DeleteOutlined style={{ color:"red"}} 
                onClick={() => {
                    showModal("delete");
                    setDeleteId(record.id);
                }}
              />
            </Space>
          ),
        }
    ];
    
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getRecords() as any);
      !categories.length && dispatch(getCategories() as any);
    }, [])
    
    const isFormValid = !(!form.title || form.amount === 0 || form.category_id === 0);

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
                <Button type="primary" onClick={() => {showModal("new")}}>
                    New Record
                </Button>
            </div>
            <Modal title={mode === "new" 
                    ? "Create New Record" 
                    : mode === "edit" 
                    ? "Update Record" 
                    : "Delete Record"
                } 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                okButtonProps={{disabled: !(mode === "delete") && !isFormValid}}
            >
                {mode === "edit" || mode === "new" ? ( 
                <Form labelCol={{span: 8}} wrapperCol={{span: 16}}>
                <Form.Item label="Title">
                    <Input 
                        name="title" 
                        value={form.title} 
                        onChange={e => setForm({...form, title: e.target.value})} 
                    />
                </Form.Item>
                <Form.Item label="Amount">
                    <Input 
                        name="amount" 
                        value={form.amount} 
                        type="number"
                        onChange={e => setForm({...form, amount: Number(e.target.value)})} 
                    />
                </Form.Item>
                <Form.Item label="Category">
                    <Select 
                        defaultValue={form.category_id} 
                        value={form.category_id} 
                        onChange={category_id => setForm({...form, category_id})}
                    >
                    <Select.Option value={0} disabled>Select a category</Select.Option>
                    {categories.map(category =>{
                        return <Select.Option value={category.id} key={category.id}>{category.name}</Select.Option>
                    })}
                    </Select>
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
