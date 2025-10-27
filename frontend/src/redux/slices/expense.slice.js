import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstace } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const getAllExpenses = createAsyncThunk(
    'api/expense/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.get(
                API_PATHS.EXPENSE.GET_ALL_EXPENSE
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addExpense = createAsyncThunk(
    'api/expense/add',
    async (expense, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.post(
                API_PATHS.EXPENSE.ADD_EXPENSE, expense
            )
            return {
                ...response.data.newExpense,
                message: "Expense added successfully"
            }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateExpense = createAsyncThunk(
    'api/expense/update',
    async ({ data, id }, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.patch(
                API_PATHS.EXPENSE.UPDATE_EXPENSE(id), data
            )
            return {
                ...response.data.updatedExpense,
                message: "Expense Updated successfully"
            }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteExpense = createAsyncThunk(
    'api/expense/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstace.delete(
                API_PATHS.EXPENSE.DELETE_EXPENSE(id),
            )
            return { id: id, message: "Expense deleted successfully" }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        allExpenses: null,
        fetchingExpense: false,
        savingExpense: false,
        deletingExpense: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllExpenses.pending, (state) => {
                state.fetchingExpense = true
            })
            .addCase(getAllExpenses.fulfilled, (state, action) => {
                state.fetchingExpense = false
                state.allExpenses = action.payload
            })
            .addCase(getAllExpenses.rejected, (state, action) => {
                state.fetchingExpense = false
                state.error = action.payload
            })
            .addCase(addExpense.pending, (state) => {
                state.savingExpense = true
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.savingExpense = false
                state.allExpenses = [ action.payload, ...state.allExpenses]
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.savingExpense = false
                state.error = action.payload
            })
            .addCase(updateExpense.pending, (state) => {
                state.savingExpense = true
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                state.savingExpense = false
                const index = state.allExpenses.findIndex(
                    (expense) => expense._id == action.payload._id
                )
                if (index != -1) {
                    state.allExpenses[index] = action.payload
                }
            })
            .addCase(updateExpense.rejected, (state, action) => {
                state.savingExpense = false
                state.error = action.payload
            })
            .addCase(deleteExpense.pending, (state) => {
                state.deletingExpense = true
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.deletingExpense = false
                state.allExpenses = state.allExpenses.filter(
                    (item) => item._id != action.payload.id
                )
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.deletingExpense = false
                state.error = action.payload
            })
    }
})

export default expenseSlice.reducer