import { ThunkDispatch } from "redux-thunk";
import { Category } from "./category";


export interface RecordState {
    data: Record[],
    loading: boolean,
    error: string
}

export interface RecordForm{
    title: string,
    amount: number,
    category_id: number
}

export interface Record {
    id: number,
    title: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
    category: Category
}

interface GET_RECORDS_START {
    type: "GET_RECORDS_START"
}

interface GET_RECORDS_SUCCESS {
    type: "GET_RECORDS_SUCCESS",
    payload: Record[]
}

interface GET_RECORDS_ERROR {
    type: "GET_RECORDS_ERROR"
}

interface ADD_RECORD_START {
    type: "ADD_RECORD_START"
}

interface ADD_RECORD_SUCCESS {
    type: "ADD_RECORD_SUCCESS",
    payload: Record
}

interface ADD_RECORD_ERROR {
    type: "ADD_RECORD_ERROR"
}

export type RecordAction = 
    | GET_RECORDS_START
    | GET_RECORDS_SUCCESS
    | GET_RECORDS_ERROR
    | ADD_RECORD_START
    | ADD_RECORD_SUCCESS
    | ADD_RECORD_ERROR;
export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;