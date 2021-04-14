
const initalState = {
    teacherList: [],
    studentList: []
    
}

const adminReducer = (state=initalState, action) => {
    switch (action.type) {
        case "FETCH_TEACHER":
            return {...state, teacherList: action.playload}
        case "ADD_TEACHER":
            return {...state, teacherList: [...state.teacherList, action.playload]}
        case "ADD_STUDENT":
            return {...state, studentList: [...state.studentList, action.playload]}
        case "DELETE_TEACHER":
            return state.teacherList(teacher => teacher.email !== action.payload)
        case "DELETE_STUDENT":
            return state.teacherList(student => student.email !== action.payload)
        default:
            return state
    }
  };
  

export default adminReducer;
  