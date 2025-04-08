import axios from "axios"

const BASE_URL = "https://localhost:7213/Account"

interface IAuth {
    email: string,
    password: string,
    lastName: string,
    firstName: string,
    age: number,
    phoneNumber: string,
    address: string,
    parentEmail: string,
    parentName: string
}

export const register = async (formValues: any) => {
    const [firstName, lastName] = formValues.name.split(' ');

    const formData: IAuth = {
        email: formValues.parentEmail,
        password: formValues.password,
        lastName: lastName || '',
        firstName: firstName || '',
        age: parseInt(formValues.age, 10),
        phoneNumber: formValues.phoneNumber,
        address: formValues.address,
        parentEmail: formValues.parentEmail,
        parentName: formValues.parentName,
    };

    const formDataWithRole = {
        ...formData,
        role: 1, // Ensure the role is included
    };

    try {
        const response = await axios.post(`${BASE_URL}/register`, formDataWithRole, {
            headers: {
                'Content-Type': 'application/json', // Ensure proper JSON content type
            },
        });
        localStorage.setItem('token', JSON.stringify(response.data.token));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error message:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            }
        }
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        localStorage.setItem("token", JSON.stringify(response.data.token));
    } catch (error) {
        console.log(error);
    }   
};