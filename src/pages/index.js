import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = (props) => {
  const siteTitle = props.data.site.siteMetadata.title || `Title`
  const posts = props.data.allContentfulBlogPost.edges
  const location=props.location
  

  if (posts.length === 0) {
    return (
      <Layout location={location} title={posts.title}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(({node}) => {
          const title = node.title || node.slug

          return (
            <li key={node.slug}>
              
                <header>
                  <h2>
                    <Link to={node.slug} itemProp="url">
                      <span itemProp="headline">{node.title}</span>
                    </Link>
                  </h2>
                  <small>{node.date}</small>
                </header>
                <section>
                  <p>{node.subtitle}</p>
                    
                
                </section>
            
            </li>
          )
        })}
      </ol>
    </Layout>
  ) 

}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  allContentfulBlogPost{
    edges{
      node{
        slug
      title
      subtitle
      author
      
      
      }
    }
      
      }
    
    }
 
`
