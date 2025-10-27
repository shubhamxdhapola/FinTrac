import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstace } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const getAllIncome = createAsyncThunk(
    'api/income/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.get(
                API_PATHS.INCOME.GET_ALL_INCOME
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addIncome = createAsyncThunk(
    'api/income/add',
    async (income, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.post(
                API_PATHS.INCOME.ADD_INCOME, income
            )
            return {
                ...response.data.newIncome,
                message: "Income added successfully"
            }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateIncome = createAsyncThunk(
    'api/income/update',
    async ({data, id}, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.patch(
                API_PATHS.INCOME.UPDATE_INCOME(id), data
            )
            return { 
                ...response.data.updatedIncome, 
                message: "Income Updated successfully" 
            }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteIncome = createAsyncThunk(
    'api/income/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstace.delete(
                API_PATHS.INCOME.DELETE_INCOME(id),
            )
            return { id: id, message: "Income deleted successfully" }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const incomeSlice = createSlice({
    name: 'income',
    initialState: {
        allIncomes: null,
        fetchingIncome: false,
        savingIncome: false,
        deletingIncome: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllIncome.pending, (state) => {
                state.fetchingIncome = true
            })
            .addCase(getAllIncome.fulfilled, (state, action) => {
                state.fetchingIncome = false
                state.allIncomes = action.payload
            })
            .addCase(getAllIncome.rejected, (state, action) => {
                state.fetchingIncome = false
                state.error = action.payload
            })
            .addCase(addIncome.pending, (state) => {
                state.savingIncome = true
            })
            .addCase(addIncome.fulfilled, (state, action) => {
                state.savingIncome = false
                state.allIncomes = [action.payload, ...state.allIncomes]
            })
            .addCase(addIncome.rejected, (state, action) => {
                state.savingIncome = false
                state.error = action.payload
            })
            .addCase(updateIncome.pending, (state) => {
                state.savingIncome = true
            })
            .addCase(updateIncome.fulfilled, (state, action) => {
                state.savingIncome = false
                const index = state.allIncomes.findIndex(
                    (income) => income._id == action.payload._id
                )
                if(index != -1) {
                    state.allIncomes[index] = action.payload
                }
            })
            .addCase(updateIncome.rejected, (state, action) => {
                state.savingIncome = false
                state.error = action.payload
            })
            .addCase(deleteIncome.pending, (state) => {
                state.deletingIncome = true
            })
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.deletingIncome = false
                state.allIncomes = state.allIncomes.filter(
                    (item) => item._id != action.payload.id
                )
            })
            .addCase(deleteIncome.rejected, (state, action) => {
                state.deletingIncome = false
                state.error = action.payload
            })
    }
})

export default incomeSlice.reducer