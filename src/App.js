import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { ConfigProvider, Flex, Layout, Typography, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import Differ from "./Differ";

function App() {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
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
							GitHub Release Diff
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
					<Differ />
				</Content>
				<Footer></Footer>
			</Layout>
		</ConfigProvider>
	);
}

export default App;
