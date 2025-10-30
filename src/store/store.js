import { configureStore } from "@reduxjs/toolkit"
import slice from './authSlic'


const store = configureStore({
    reducer:{
        auth: slice
    }
})



export default store
