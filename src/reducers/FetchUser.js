

const FetchUser = (state=[] ,action) => {
    switch(action.type){
      case "CREATE_USER":
      return action.payload;
      case "LOGIN_USER":
      return action.payload ;    
       case "POST_LIST" :
       return action.payload ;   
       case "CREATE_POST" :
       return action.payload ;   
       case "EDIT_POST" :
       return action.payload ;   
       case "DELETE_POST" :
       return action.payload ;   
       default:
      return state;
    }
  }
  
export default FetchUser;