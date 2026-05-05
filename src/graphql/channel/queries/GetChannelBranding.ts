import { gql } from "@apollo/client";

export const GET_CHANNEL_BRANDING = gql`
  query GetChannelBranding {
    channels {
      edges {
        node {
          code
          logo
          logoUrl
          favicon
          faviconUrl
          translation {
            name
            homeSeo
          }
        }
      }
    }
  }
`;
