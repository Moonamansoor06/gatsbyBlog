const path = require(`path`)
const { paginate, createPagePerItem } = require('gatsby-awesome-pagination')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post-contentful.js`)
  return (
    graphql(`{
      allContentfulBlogPost{
      edges{
        node{
          slug,
          title
        }
      }
       
    }
  }
  `).then(result => {
      if (result.errors) {
        throw result.errors
      }
      const posts = result.data.allContentfulBlogPost.edges

      /* paginate({
        createPage,
        items: posts.node,
        itemsPerPage: 3,
        component: path.resolve('src/pages/index'),

        pathPrefix: 'post.node.slug',
        buildPath: (index, pathPrefix) =>
          index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`,

      }) */


      if (posts.length > 0) {
        posts.forEach((post, index) => {
          const previous = index === 0 ? null : posts[index - 1].node
          const next = index === posts.length - 1 ? null : posts[index + 1].node
          createPage({
            path: post.node.slug,
            component: blogPost,
            context: {
              slug: post.node.slug,
              previous,
              next
            }
          })
        })
      }
    }))
}