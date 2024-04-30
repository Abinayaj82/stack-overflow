import * as api from "../api";

// export const getTimelinePosts = (id) => async (dispatch) => {
//   dispatch({ type: "RETREIVING_START" });
//   try {
//     const { data } = await api.getTimelinePosts(id);
//    // console.log(data)
//     dispatch({ type: "RETREIVING_SUCCESS", data: data });
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: "RETREIVING_FAIL" });
//   }
// };
export const getAllPosts = () => async (dispatch) => {
  try {
      const { data } = await api.getAllPosts();
      dispatch({ type: "FETCH_ALL_POSTS", payload: data})
  } catch (error) {
      console.log("fetch posts error: " + error)
  }
}