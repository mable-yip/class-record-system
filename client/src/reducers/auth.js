
const initalState = {
  authData: null
  
}

const authReducer = (state=initalState, action) => {
  switch (action.type) {
    case "AUTH_SIGN_IN":
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      return { ...state, authData: action.payload, loading: false, errors: null };
    case "AUTH_SIGN_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};


export default authReducer;


