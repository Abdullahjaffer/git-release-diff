# Git & NPM Release Diff

Git & NPM Release Diff is a React application built with Ant Design and GitHub's API. It allows users to fetch, filter, and compare version/release messages from GitHub repositories.

## Live

A live application is available [here](https://abdullahjaffer.github.io/git-release-diff).

## Screenshot

![Git Release Diff Screenshot](/public/screencapture-localhost-3001-2024-06-22-09_37_46.png?raw=true)

## Features

- **Fetch Releases**: Retrieve the first 100 releases from any GitHub repository, with an option to load more.
- **Compare Releases**: Select and compare changelogs, breaking changes, and other release details.
- **Filtering Options**: Filter out canary releases or releases with breaking changes for easier analysis.

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Abdullahjaffer/git-release-diff.git
   cd git-release-diff
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the application:**

   ```sh
   npm run start
   ```

   The app will be available at `http://localhost:3000`.

## Usage

1. Enter the GitHub repository link.
2. Click the "Fetch Releases" button to retrieve the releases.
3. Filter and select releases to view and compare their details.

## Contributing

Contributions are welcome! Fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
