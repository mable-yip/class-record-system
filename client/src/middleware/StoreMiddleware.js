export const StoreMiddleware = (store) => (next) => (action) => {
    console.log("storeMiddleware: action type = ", action.type)
  
    if(action.type === "LOGIN_SUCCESS"){
      localStorage.setItem('profile', JSON.stringify(action.payload))
    } else if(action.type === "LOGOUT"){
      console.log("CLEAR")
      localStorage.clear()
    }
    return next(action)
  }