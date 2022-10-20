import axios from "axios";

export default () => {
    //const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "http://localhost:8080/api/v1",
        /*
        headers: {
            Authorization: token,
        }
        */
    });
}