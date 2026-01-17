import { gql } from "@apollo/client/core/index.js";

export const allCategories = gql`
  query GetAllCategories {
    Allcategories {
      success
      message
      code
      data {
        # This level is the Pagination object
        items {
          # This level is the actual Category object
          id
          nameEn
          nameAr
          code
          isActive
          isFeatured
          numberOfServices
          readableCreatedAt

          image {
            file
            thumbnail
            type
          }

          companyServices {
            id
            nameEn
            nameAr
            slug
          }

          cities {
            id
            name
            nameAr
          }
        }
        pageInfo {
          totalCount
          hasNext
          page
        }
      }
    }
  }
`;

export const citiesSchema = gql`
  query GetFeaturedCategories {
    getCities {
      code
      success
      message
      data {
        id
        name
        nameAr
        countryId
      }
    }
  }
`;

export const SEARCH_QUERY = gql`
  query Search($searchKey: String!, $limit: Float!, $cityId: Float) {
    search(searchKey: $searchKey, limit: $limit, cityId: $cityId) {
      code
      success
      message
      data {
        providers {
          id
          nameEn
          nameAr
          slug
          logo {
            file
            thumbnail
            type
            size
          }
        }
        services {
          id
          nameEn
          nameAr
          slug
        }
      }
    }
  }
`;
