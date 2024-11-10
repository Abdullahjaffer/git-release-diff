import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, Flex, Layout, Tabs, Typography, theme } from "antd";
import React from "react";
import GitDiffer from "./git-diff/Differ";
import NpmDiff from "./npm-diff";

const { Header, Content, Footer } = Layout;

// Create a client
const queryClient = new QueryClient();

function App() {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<QueryClientProvider client={queryClient}>
				<Layout
					style={{
						minHeight: "100vh",
					}}
				>
					<Header>
						<Flex
							justify="space-between"
							align="center"
							style={{
								height: "100%",
							}}
						>
							<Typography.Title
								level={4}
								style={{
									margin: 0,
								}}
							>
								GitHub & NPM Release Diff
							</Typography.Title>
							<Flex style={{ fontSize: "24px" }} align="center" gap={16}>
								<a
									target="_blank"
									style={{
										textDecoration: "none",
									}}
									href="https://www.linkedin.com/in/abdullahjaffer/"
									rel="noreferrer"
								>
									<LinkedinOutlined />
								</a>
								<a
									target="_blank"
									style={{
										textDecoration: "none",
									}}
									href="https://github.com/Abdullahjaffer"
									rel="noreferrer"
								>
									<GithubOutlined />
								</a>
							</Flex>
						</Flex>
					</Header>
					<Content
						style={{
							padding: 32,
							paddingLeft: 50,
							paddingRight: 50,
						}}
					>
						<Tabs>
							<Tabs.TabPane tab="Git Diff" key="1">
								<GitDiffer />
							</Tabs.TabPane>
							<Tabs.TabPane tab="NPM Diff" key="2">
								<NpmDiff />
							</Tabs.TabPane>
						</Tabs>
					</Content>
					<Footer></Footer>
				</Layout>
			</QueryClientProvider>
		</ConfigProvider>
	);
}

export default App;
