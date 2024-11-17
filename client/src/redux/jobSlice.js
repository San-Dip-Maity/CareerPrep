import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        filterJobsBySearchText: (state) => {
            // Automatically filter jobs based on searchJobByText
            if (state.searchJobByText) {
                state.searchedQuery = state.allJobs.filter(
                    (job) =>
                        job.title.toLowerCase().includes(state.searchJobByText.toLowerCase()) ||
                        job.company.name.toLowerCase().includes(state.searchJobByText.toLowerCase()) ||
                        job.location.toLowerCase().includes(state.searchJobByText.toLowerCase())
                );
            } else {
                state.searchedQuery = state.allJobs;
            }
        },
    },
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    filterJobsBySearchText,
} = jobSlice.actions;

export default jobSlice.reducer;
