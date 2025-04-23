
const swmsSlice = createSlice({
    name: "swms",
    initialState: {
        swms: [],
    },
    reducers: {
        setSwms: (state, action) => {
            state.swms = action.payload;
        },
    },
});