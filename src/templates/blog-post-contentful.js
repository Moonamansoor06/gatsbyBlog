import React from "react"
import { Link, graphql } from "gatsby"
import {MARKS, BLOCKS } from '@contentful/rich-text-types'; 
import { renderRichText } from "gatsby-source-contentful/rich-text"

 
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from 'gatsby-image'

const BlogPostContentfulTemplate = (props) => {
  const post = props.data.contentfulBlogPost
  console.log('props is ==>',props.pageContext)
  /* const siteTitle = props.data.site.siteMetadata.title || `Title` */
  const { previous, next } = props.pageContext

  const Bold = ({ children }) => <span className="bold">{children}</span>
  const Text = ({ children }) => <p className="align-center">{children}</p>
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      
    },
  }
 const p =renderRichText(post.body, options)

 
  return (
    <Layout location={props.location}>
  
      <SEO
        title={post.title}
        description={post.subtitle}
        
      />
    {<Img fluid={post.blogImage.fluid}/>}


      <h1>{post.title}</h1>
    
      <p
      style={{
     
        display:`block`,
        marginBottom:'.1rem',
        marginTop:'.1rem',

            }}
            >
        {renderRichText(post.body, options)}
            </p>
        
            <hr style={{marginBottom:'.1rem'}}/>
            
      
          <Bio />
  
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.slug}`}rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug:String!){
     site{
      siteMetadata {
        title
        
      }
  
     }   
    contentfulBlogPost(slug:{eq:$slug}){
      title
      subtitle
      author
      blogImage{ 
        fluid(maxWidth: 980){
              ...GatsbyContentfulFluid
           } 
      }
      body{
        raw
        
     
      }
  
  }
  }
`
