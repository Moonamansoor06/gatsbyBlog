import React from "react"
import { graphql } from "gatsby"
import RichText from '@madebyconnor/rich-text-to-jsx';
 
const WallOfTextComponent = ({body}) => <RichText richText={body.json} />
 
export default WallOfTextComponent
 
export const modelName = 'ContentfulWallOfTextComponent';
 
export const query = graphql`
 fragment WallOfTextComponentFragment on ContentfulWallOfTextComponent {
   body {
     json
   }
   __typename
 }`
