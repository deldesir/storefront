import { gql } from "@apollo/client";

/**
 * Fetch category tree structure with children for recursive slug lookup
 * @param parentId - Parent category ID
 */
export const GET_TREE_CATEGORIES = gql`
  query treeCategories($parentId: Int) {
    treeCategories(parentId: $parentId) {
      id
      position
      logoPath
      status
      translation {
        id
        name
        slug
        description
        urlPath
        metaTitle
      }
      children {
        edges {
          node {
            id
            position
            logoPath
            status
            translation {
              id
              name
              slug
              description
              urlPath
              metaTitle
            }
          }
        }
      }
    }
  }
`;
