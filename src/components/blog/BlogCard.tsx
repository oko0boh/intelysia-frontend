import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { BlogPost } from '../../utils/data';
interface BlogCardProps {
  post: BlogPost;
}
const BlogCard: React.FC<BlogCardProps> = ({
  post
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blog/${post.id}`}>
        <div className="h-48 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
            {post.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(post.date).toLocaleDateString()}
          </div>
        </div>
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">By {post.author}</span>
          <Link to={`/blog/${post.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;