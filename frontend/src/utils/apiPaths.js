export const API_PATHS = {

    AUTH: {
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        GET_PROFILE: '/api/auth/get-user'
    },

    IMAGE : {
        UPLOAD : '/api/upload',
    },

    DASHBOARD : {
        GET_DATA : '/api/dashboard'
    },

    INCOME : {
        ADD_INCOME : '/api/income/add',
        GET_ALL_INCOME : '/api/income',
        UPDATE_INCOME : (incomeId) => `/api/income/${incomeId}`,
        DELETE_INCOME : (incomeId) => `/api/income/${incomeId}`
    },
    
    EXPENSE : {
        ADD_EXPENSE : '/api/expense/add',
        GET_ALL_EXPENSE : '/api/expense',
        UPDATE_EXPENSE : (expenseId) => `/api/expense/${expenseId}`,
        DELETE_EXPENSE : (expenseId) => `/api/expense/${expenseId}`,
    }
}