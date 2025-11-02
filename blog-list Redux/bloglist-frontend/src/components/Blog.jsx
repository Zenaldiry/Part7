import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
  return (
    <div id="blog">
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/blogs/${blog.id}`}
      >
        <span id="title-author">
          {blog.title} by {blog.author}{' '}
        </span>
      </Link>
    </div>
  )
}

export default Blog
