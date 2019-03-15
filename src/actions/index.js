import api from '../api/Post';
import { toastr} from 'react-redux-toastr'


export const createUser = (values, callback) => {
  const headers = {
    'Content-Type': 'application/json',
  }

  const response = api.post('/wp/v2/users/register', values, {
    headers: headers
  });
  response.then((res) => {
    callback(res);

    toastr.success('successfully signup')
  })
  response.catch((error) => {
    toastr.error('User already exist with this username or email');
  })
  return {
    type: 'CREATE_USER',
    payload: response
  };
}



export const loginUser = (values, callback) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  const response = api.post('/jwt-auth/v1/token', values, {
    headers: headers
  });
  response.then((res) => {
    callback(res);
    console.log(res, 'hfsd');

    toastr.success('successfully login')
  })
  response.catch((error) => {
    toastr.error('invalid user');
  })

  return {
    type: 'LOGIN_USER',
    payload: response
  };
}


export const postList = (callback) => {
  const response = api.get('/wp/v2/posts/');
  response.then((res) => {
    callback(res);
  });
  response.catch((error) => {
    toastr.error('invalid user');
  })
  return {
    type: 'POST_LIST',
    payload: response
  };
}

export const getSinglepost = (id, callback) => {
  const response = api.get(`/wp/v2/posts/${id}`);
  return (dispatch) => {
  response.then((res) => {
    dispatch({
      type: 'SINGLE_POST',
      payload: res.data
  })
    callback(res);
  });
  response.catch((error) => {
    toastr.error('invalid user');
  })
}
}

export const createPost = (values, callback) => () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
  const response = api.post('/wp/v2/posts/', values, {
    headers: headers
  });

  response.then((res) => {
    callback(res);
    toastr.success('you created a new post')
  })
  response.catch((error) => {
    callback(error.response);
    toastr.error('invalid user');
  })
  return {
    type: 'CREATE_POST',
    payload: response
  };
}



export const editPost = (id, values) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
  const response = api.put(`/wp/v2/posts/${id}`, values, {
    headers: headers
  });
  response.then((res) => {
    toastr.success('you Edited a post')
    return res;
  })
  response.catch((error) => {
    toastr.warning('something went wrong');
  })
  return {
    type: 'EDIT_POST',
    payload: response
  };
}



export const deletePost = (id, callback) => () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }

  const response = api.delete(`/wp/v2/posts/${id}`, {
    headers: headers
  });
  response.then((res) => {
    callback(res);
    toastr.success('you deleted a post')
  });
  response.catch((error) => {
    toastr.error('can\'t delete post');
  });
}