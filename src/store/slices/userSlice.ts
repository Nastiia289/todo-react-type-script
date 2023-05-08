import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  checkTodo,
  createTodo,
  deleteTodo,
  getCurrentUser,
  getTest,
  signIn,
  signUp,
} from "../../api/user";

export interface ITodo {
  label: string;
  isDone: boolean;
  _id: string;
}

export interface IUser {
  email?: string;
  todos?: ITodo[];
}

export interface IUserState {
  value: string;
  isTestLoading: boolean;
  testError: string;
  isAuthLoading: boolean;
  authError: string;
  user: IUser;
  isUserLoading: boolean;
  userError: string;
  token: string;
  isTodoCreateLoading: boolean;
  todoCreateError: string;
  isTodoDeleteLoading: boolean;
  todoDeleteError: string;
  isTodoCheckLoading: boolean;
  todoCheckError: string;
}

export interface ISignUp {
  email: string;
  password: string;
}

const token = localStorage.getItem("token");

const initialState: IUserState = {
  value: "",
  isTestLoading: false,
  testError: "",
  isAuthLoading: false,
  authError: "",
  user: {},
  isUserLoading: false,
  userError: "",
  token: token ?? "",
  isTodoCreateLoading: false,
  todoCreateError: "",
  isTodoDeleteLoading: false,
  todoDeleteError: "",
  isTodoCheckLoading: false,
  todoCheckError: "",
};

export const getTestAsync = createAsyncThunk("/user/getTest", async () => {
  const response = await getTest();
  return response.data;
});

export const signUpAsync = createAsyncThunk(
  "/user/signUp",
  async (formData: ISignUp) => {
    const response = await signUp(formData);
    return response.data;
  }
);

export const signInAsync = createAsyncThunk(
  "/user/signIn",
  async (formData: ISignUp) => {
    const response = await signIn(formData);
    return response.data;
  }
);

export const getCurrentUserAsync = createAsyncThunk(
  "/user/current",
  async () => {
    const response = await getCurrentUser();
    return response.data;
  }
);

export const createTodoAsync = createAsyncThunk(
  "/todo/create",
  async (label: string) => {
    const response = await createTodo(label);
    return response.data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  '/todo/delete',
  async (id: string) => {
    const response = await deleteTodo(id);
    return response.data;
  }
);

export const checkTodoAsync = createAsyncThunk(
  '/todo/check',
  async (id: string) => {
    const response = await checkTodo(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.user = {};
      localStorage.removeItem("token");
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestAsync.pending, (state) => {
        state.isTestLoading = true;
      })
      .addCase(getTestAsync.fulfilled, (state, action) => {
        state.isTestLoading = false;
        state.value = action.payload.message;
      })
      .addCase(getTestAsync.rejected, (state, action) => {
        state.isTestLoading = false;
        state.testError = action.error.message ?? "error";
      });

    builder
      .addCase(signUpAsync.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        const token = action.payload.token;
        localStorage.setItem("token", token);
        state.token = token;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message ?? "error";
      });

    builder
      .addCase(signInAsync.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        const token = action.payload.token;
        localStorage.setItem("token", token);
        state.token = token;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message ?? "error";
      });

    builder
      .addCase(getCurrentUserAsync.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getCurrentUserAsync.rejected, (state, action) => {
        state.isUserLoading = false;
        state.userError = action.error.message ?? "error";
      });

    builder
      .addCase(createTodoAsync.pending, (state) => {
        state.isTodoCreateLoading = true;
      })
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.isTodoCreateLoading = false;
        state.user.todos = [...(state.user.todos || []), action.payload];
      })
      .addCase(createTodoAsync.rejected, (state, action) => {
        state.isTodoCreateLoading = false;
        state.todoCreateError = action.error.message ?? "error";
      });

      
      builder
      .addCase(deleteTodoAsync.pending, (state) => {
        state.isTodoDeleteLoading = true;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.isTodoDeleteLoading = false;
        state.user.todos = state.user.todos?.filter(todo => todo._id !== action.payload.id);
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.isTodoDeleteLoading = false;
        state.todoDeleteError = action.error.message ?? "error";
      });

      builder
      .addCase(checkTodoAsync.pending, (state) => {
        state.isTodoCheckLoading = true;
      })
      .addCase(checkTodoAsync.fulfilled, (state, action) => {
        state.isTodoCheckLoading = false;
        const todos = state.user.todos?.filter(todo => todo._id !== action.payload._id) || [];
        state.user.todos = [...todos, action.payload];

      })
      .addCase(checkTodoAsync.rejected, (state, action) => {
        state.isTodoCheckLoading = false;
        state.todoCheckError = action.error.message ?? "error";
      });
  },
});

export const { setInputValue, logout } = userSlice.actions;

export default userSlice.reducer;
