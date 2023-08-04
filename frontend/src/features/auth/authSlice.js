import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

    export const login = createAsyncThunk('auth/login', async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/auth/login/success`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        if (response.status === 200) {
          const resObject = await response.json();
          return resObject.user;
        } else {
          throw new Error("Authentication has failed!");
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
});

export const authSlice = createSlice({
    name: "auth",
    initialState:{
      user: null,
      status: "idle",
      error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.status = "loading";
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
    },
});
export const {setUser} = authSlice.actions;
export default authSlice.reducer;


 




