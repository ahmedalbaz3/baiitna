import { gql } from "@apollo/client/core/index.js";

export const ALL_CATEGORIES = gql`
  query Allcategories($limit: Int!) {
    Allcategories(paginate: { limit: $limit }) {
      code
      success
      message
      data {
        items {
          id
          nameEn
          nameAr
          image {
            file
          }
          code
          companyServices {
            id
            nameEn
            nameAr
            image {
              file
            }
          }
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

export const SERVICES_QUERY = gql`
  query GetAllServices($limit: Int!, $page: Int!) {
    services(paginate: { limit: $limit, page: $page }) {
      code
      success
      message
      data {
        items {
          id
          nameEn
          nameAr
          code
          slug
          category {
            nameEn
            nameAr
            id
          }
          numberOfCompanies
        }
        pageInfo {
          totalCount
        }
      }
    }
  }
`;

export const MOST_SERVICE_QUERY = gql`
  query GetMostPopularServices {
    getMostPopularServices {
      code
      success
      message
      data {
        serviceId
        serviceName
      }
    }
  }
`;

export const PROVIDERS_QUERY = gql`
  query AllProviders($serviceId: String, $limit: Int!) {
    allProviders(
      filter: { serviceId: $serviceId }
      paginate: { limit: $limit }
    ) {
      code
      success
      message
      data {
        items {
          id
          slug
          businessNameEn
          businessNameAr
          aboutEn
          aboutAr
          sloganEn
          sloganAr
          phones
          businessPhone
          whatsapp
          businessEmail
          jobTitle
          code

          logo {
            file
          }
          cover {
            file
          }
        }
      }
    }
  }
`;

export const GET_FEATURED_BOARD = gql`
  query FeaturedBoard {
    featuredBoard {
      code
      success
      message
      data {
        categories {
          id
          nameEn
          nameAr
          isActive
          code
          isFeatured
          image {
            file
          }
        }
        services {
          id
          nameEn
          nameAr
          code
          isFeatured
          isActive
          categoryId
          slug
          image {
            file
          }
        }
      }
    }
  }
`;
