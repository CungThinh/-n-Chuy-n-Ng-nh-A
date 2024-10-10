import axios from 'axios';

const apiUrl = '/api';
const httpClient = async (url, options = {}) => {
    try {
        const response = await axios({
            url,
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return {
            data: response.data,
        };
    } catch (error) {
        console.error('HTTP Client Error:', error);
        throw new Error(error.response?.data?.error || error.message || 'Network error occurred');
    }
};

const dataProvider = {
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const { data } = await httpClient(url);
        if (!Array.isArray(data)) {
            throw new Error('Expected the response to be an array');
        }
        return {
            data: data,
            total: data.length,
        };
    },

    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { data } = await httpClient(url);
        return { data: { ...data, id: data.id } }
    },

    getMany: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const { data } = await httpClient(url, {
            method: 'GET',
            data: { ids: params.ids } // Sending the list of IDs
        });
        return {
            data: data.map(record => ({ ...record, id: record.id })),
        };
    },

    // CREATE method
    create: async (resource, params) => {
        console.log(params.data)
        const url = `${apiUrl}/${resource}`;
        const { data } = await httpClient(url, {
            method: 'POST',
            data: params.data
        })
        return {
            data: { ...data, id: data.id },
        };
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { data } = await httpClient(url, {
            method: 'PUT',
            data: params.data
        })
        return {
            data: { ...data, id: data.id },
        };
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        await httpClient(url, {
            method: 'DELETE',
        });
        return { data: { id: params.id } };
    }
};

export default dataProvider;