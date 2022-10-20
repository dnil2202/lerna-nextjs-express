import { configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";

export const rootStore = configureStore({
    // Untuk Mengelompokan semua reducer yang telah dibuat
    reducer:{
        userReducer
    }
})