export const RATE_LIMIT_FRAGMENT = `
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
`;

export const REPO_FIELDS_FRAGMENT = `
  id
  name
  nameWithOwner
  description
  url
  homepageUrl
  stargazerCount
  forkCount
  isPrivate
  isFork
  isArchived
  updatedAt
  createdAt
  owner {
    login
    avatarUrl
  }
  primaryLanguage {
    name
    color
  }
  languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
    edges {
      size
      node {
        name
        color
      }
    }
  }
  repositoryTopics(first: 10) {
    nodes {
      topic {
        name
      }
    }
  }
`;

export const GET_USER_PINNED_REPOS = `
  query GetPinnedRepos($username: String!) {
    ${RATE_LIMIT_FRAGMENT}
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            ${REPO_FIELDS_FRAGMENT}
          }
        }
      }
    }
  }
`;

export const GET_USER_PUBLIC_REPOS = `
  query GetPublicRepos($username: String!, $first: Int = 50) {
    ${RATE_LIMIT_FRAGMENT}
    user(login: $username) {
      repositories(
        first: $first
        privacy: PUBLIC
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          ${REPO_FIELDS_FRAGMENT}
        }
      }
    }
  }
`;

export const GET_REPO_README = `
  query GetRepoReadme($owner: String!, $repo: String!) {
    ${RATE_LIMIT_FRAGMENT}
    repository(owner: $owner, name: $repo) {
      object(expression: "HEAD:README.md") {
        ... on Blob {
          text
        }
      }
    }
  }
`;

export const GET_CONTRIBUTION_CALENDAR = `
  query GetContributionCalendar($username: String!) {
    ${RATE_LIMIT_FRAGMENT}
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
              weekday
            }
          }
        }
      }
    }
  }
`;
