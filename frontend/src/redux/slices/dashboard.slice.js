import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstace } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const getDashboardData = createAsyncThunk(
    'api/dashboard',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.get(
                API_PATHS.DASHBOARD.GET_DATA
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        dashboardData: null,
        loading: false
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.pending, (state) => {
                state.loading = true
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.loading = false
                state.dashboardData = action.payload
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default dashboardSlice.reducer