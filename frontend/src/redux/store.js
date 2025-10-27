import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth.slice.js'
import uploadSlice from './slices/upload.slice.js'
import dashboardSlice from './slices/dashboard.slice.js'
import incomeSlice from './slices/income.slice.js'
import expenseSlice from './slices/expense.slice.js'

const store = configureStore({
    reducer: {
        auth: authSlice,
        upload: uploadSlice,
        dashboard: dashboardSlice,
        income: incomeSlice,
        expense: expenseSlice,
    }
})

export default store;