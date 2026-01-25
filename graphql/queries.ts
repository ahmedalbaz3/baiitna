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
  query AllProviders($serviceId: String, $limit: Int!, $cityName: String) {
    allProviders(
      filter: { serviceId: $serviceId, cityName: $cityName }
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

export const LOGIN_MUTATION = gql`
  mutation UserLogin(
    $email: String!
    $password: String!
    $deviceType: DeviceEnum!
    $deviceName: String!
  ) {
    userLogin(
      input: {
        email: $email
        password: $password
        loginDetails: { device: $deviceType, deviceName: $deviceName }
      }
    ) {
      code
      success
      message
      data {
        id
        firstName
        lastName
        email
        phone
        profilePicture
        code
        isBlocked
        isVerified
        notificationManager
        token
        countryId
        cityId
        notifyMe
        role
        favLang
        unseenNotificationsCount
        hasUpdatedAddress
        fullName
        hasPassword
        createdAt
        readableCreatedAt
        updatedAt
        readableUpdatedAt
        deletedAt
        arFullName
        NotificationsSeen
      }
    }
  }
`;

export const GOOGLE_LOGIN_MUTATION = gql`
  mutation SocialLogin(
    $providerId: String!
    $device: DeviceEnum!
    $deviceName: String!
  ) {
    socialLogin(
      input: {
        providerId: $providerId
        provider: GOOGLE
        loginDetails: { deviceName: $deviceName, device: $device }
      }
    ) {
      data {
        id
        firstName
        lastName
        email
        phone
        profilePicture
        code
        isBlocked
        isVerified
        notificationManager
        token
        countryId
        cityId
        notifyMe
        role
        favLang
        unseenNotificationsCount
        hasUpdatedAddress
        fullName
        hasPassword
        createdAt
        readableCreatedAt
        updatedAt
        readableUpdatedAt
        deletedAt
        arFullName
        NotificationsSeen
      }
      code
      success
      message
    }
  }
`;

export const GOOGLE_REGISTER_MUTATION = gql`
  mutation SocialRegister(
    $firstName: String!
    $lastName: String!
    $email: String!
    $providerId: String!
    $device: DeviceEnum!
    $deviceName: String!
    $isManuallyEntered: Boolean!
    $token: String!
  ) {
    socialRegister(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        loginDetails: { deviceName: $deviceName, device: $device }
        providerId: $providerId
        provider: GOOGLE
        isManuallyEntered: $isManuallyEntered
        providerAuth: { authToken: $token }
      }
    ) {
      code
      success
      message
      data {
        id
        firstName
        lastName
        email
        phone
        profilePicture
        code
        isBlocked
        isVerified
        notificationManager
        token
        countryId
        cityId
        notifyMe
        role
        favLang
        unseenNotificationsCount
        hasUpdatedAddress
        fullName
        hasPassword
        createdAt
        readableCreatedAt
        updatedAt
        readableUpdatedAt
        deletedAt
        arFullName
        NotificationsSeen
      }
    }
  }
`;

export const MERGE_MUTATION = gql`
  mutation SocialMerge(
    $providerId: String!
    $device: DeviceEnum!
    $deviceName: String!
    $email: String
    $token: String!
  ) {
    socialMerge(
      input: {
        providerId: $providerId
        provider: GOOGLE
        email: $email
        loginDetails: { deviceName: $deviceName, device: $device }
        providerAuth: { authToken: $token }
      }
    ) {
      code
      success
      message
      data {
        id
        firstName
        lastName
        email
        phone
        profilePicture
        code
        isBlocked
        isVerified
        notificationManager
        token
        countryId
        cityId
        notifyMe
        role
        favLang
        unseenNotificationsCount
        hasUpdatedAddress
        fullName
        hasPassword
        createdAt
        readableCreatedAt
        updatedAt
        readableUpdatedAt
        deletedAt
        arFullName
        NotificationsSeen
      }
    }
  }
`;

export const LINK_ACCOUNT_MUTATION = gql`
  mutation LinkSocialAccount($providerId: String!, $token: String!) {
    linkSocialAccount(
      input: {
        providerId: $providerId
        provider: GOOGLE
        providerAuth: { authToken: $token }
      }
    ) {
      data
      code
      success
      message
    }
  }
`;

export const CHECK_SOCIAL_ACCOUNT_MUTATION = gql`
  query CheckSocialProviderStatus(
    $providerId: String!
    $email: String!
    $isManuallyEntered: Boolean!
    $token: String!
  ) {
    checkSocialProviderStatus(
      input: {
        providerId: $providerId
        provider: GOOGLE
        email: $email
        isManuallyEntered: $isManuallyEntered
        providerAuth: { authToken: $token }
      }
    ) {
      code
      success
      message
      data {
        actionRequired
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $deviceName: String!
    $device: DeviceEnum!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        loginDetails: { deviceName: $deviceName, device: $device }
      }
    ) {
      code
      success
      message
      data {
        id
        firstName
        lastName
        email
        phone
        profilePicture
        code
        isBlocked
        isVerified
        notificationManager
        token
        countryId
        cityId
        notifyMe
        role
        favLang
        unseenNotificationsCount
        hasUpdatedAddress
        fullName
        hasPassword
        createdAt
        readableCreatedAt
        updatedAt
        readableUpdatedAt
        deletedAt
        arFullName
        NotificationsSeen
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation SendVerificationCode($email: String!) {
    sendVerificationCode(
      input: { useCase: PASSWORD_RESET, role: USER, email: $email }
    ) {
      data
      code
      success
      message
    }
  }
`;

export const CODE_VERIFICATION_MUTATION = gql`
  mutation VerifyForgetPasswordCode(
    $email: String!
    $verificationCode: String!
  ) {
    verifyForgetPasswordCode(
      input: { email: $email, verificationCode: $verificationCode }
    ) {
      data
      code
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $email: String!
    $newPassword: String!
    $confirmPassword: String!
    $code: String!
  ) {
    resetPassword(
      input: {
        email: $email
        newPassword: $newPassword
        confirmPassword: $confirmPassword
        code: $code
      }
    ) {
      code
      success
      message
      data {
        id
        firstName
        lastName
        email
        phone
        profilePicture
        code
        isBlocked
        isVerified
        notificationManager
        token
        countryId
        cityId
        notifyMe
        role
        favLang
        unseenNotificationsCount
        hasUpdatedAddress
        fullName
        hasPassword
        createdAt
        readableCreatedAt
        updatedAt
        readableUpdatedAt
        deletedAt
        arFullName
        NotificationsSeen
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      code
      success
      message
      data {
        id
        firstName
        lastName
        email
        profilePicture
        code
        unseenNotificationsCount
        fullName
        hasPassword
        arFullName
        NotificationsSeen
      }
    }
  }
`;
