import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
const initialState = {
  user: {},
  status: "idle",
  error: null,
  };

   export const fetchLogin = createAsyncThunk('auth/login', async () => {
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
          console.log(resObject)
          return resObject.user;
        } else {
          throw new Error("Authentication has failed!");
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
});

/*export const authSlice = createSlice({
    name: "auth",
    initialState:{
      isSignedIn: false,
       user: null,
    },
    reducers: {
      setSignedIn: (state, action) => {
        state.isSignedIn = action.payload;
      },
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
    }
});*/

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      setUser: (state, action) => {
          state.user = action.payload;
      },
  },
  extraReducers:{
      [fetchLogin.pending]:(state,action)=>{
          state.status="loading";
      }
      ,
      [fetchLogin.fulfilled]:(state,action)=>{
          state.status="succeeded";
          state.user=action.payload;
      }
      ,
      [fetchLogin.rejected]:(state,action)=>{
          state.status="failed";
          state.error=action.error.message;
      },
  }
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;


 




