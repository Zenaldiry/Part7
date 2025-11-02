import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import Blog from './Blog'
import { useSelector } from 'react-redux'
const BlogsList = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  return (
    <div>
      <Card>
        <ListGroup>
          <ListGroup.Item active variant="dark">
            Blogs
          </ListGroup.Item>
          {[...blogs]
            .sort((a, b) => {
              return b.likes - a.likes
            })
            .map((blog) => (
              <ListGroup.Item key={blog.id} variant="dark" action>
                <Blog blog={blog} />
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Card>
    </div>
  )
}

export default BlogsList
