import axios from 'axios'
const baseUrl = '/api/blogs'
//get all blogs
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
//create a blog
const create = async (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  }
  const response = await axios.post(baseUrl, data.content, config)
  return response.data
}
//update a blog likes
const update = async (data) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${data.token}`,
  //   },
  // }
  const response = await axios.put(
    `${baseUrl}/${data.id}`,
    data.content
    // config
  )
  return response.data
}

//delete a blog
const deleteOne = async (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  }
  await axios.delete(`${baseUrl}/${data.id}`, config)
}

//update a blog comments
const updateComments = async (data) => {
  const response = await axios.put(`${baseUrl}/${data.id}/comments`, data)
  return response.data
}
export default { getAll, create, update, deleteOne, updateComments }
