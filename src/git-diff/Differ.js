import { Button, Collapse, Flex, Form, Input, notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
import ReleaseSelector from "./ReleaseSelector";
import ShowReleaseMessages from "./ShowReleaseMessages";

const ConditionalWrap = ({ children, condition }) =>
	condition ? children : null;

const Differ = () => {
	const [checkedList, setCheckedList] = useState([]);
	const [loadingReleases, setLoadingReleases] = useState(false);
	const [loadingMoreReleases, setLoadingMoreReleases] = useState(false);
	const [releases, setReleases] = useState([]);
	const [releasesPage, setReleasesPage] = useState(1);
	const [repo, setRepo] = useState("");

	const [api, contextHolder] = notification.useNotification();
	const openNotification = (description) => {
		api.error({
			message: `Error fetching releases`,
			description: description,
		});
	};

	const fetchReleases = async (repoUrl, page) => {
		// Extract owner and repository name from the URL
		const repoMatch = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)\.git/);
		const owner = repoMatch[1];
		const repo = repoMatch[2];
		try {
			const tagResponse = await axios.get(
				`https://api.github.com/repos/${owner}/${repo}/releases?per_page=100&page=${page}`
			);
			setReleases((releases) => [...releases, ...tagResponse.data]);
		} catch (error) {
			console.error(error);
			openNotification(error?.response?.data?.message);
		}
	};

	const handleFetchReleases = async ({ repo }) => {
		setRepo((r) => repo);
		setReleasesPage(() => 1);
		setReleases(() => []);
		setLoadingReleases(true);
		await fetchReleases(repo, 1);
		setReleasesPage((r) => r + 1);
		setLoadingReleases(false);
	};

	const handleFetchMore = async () => {
		setLoadingMoreReleases(true);
		await fetchReleases(repo, releasesPage);
		setReleasesPage((r) => r + 1);
		setLoadingMoreReleases(false);
	};

	return (
		<>
			{contextHolder}
			<Form
				layout="vertical"
				requiredMark={false}
				onFinish={handleFetchReleases}
			>
				<Form.Item
					label="Repository URL"
					name="repo"
					rules={[
						{
							required: true,
							message: "Please enter a repository URL",
						},
						{
							pattern: /github\.com\/([^/]+)\/([^/]+)\.git/,
							message: "Please enter a valid GitHub repository URL",
						},
					]}
					tooltip="This is a required field."
				>
					<Input placeholder="eg. https://github.com/vercel/next.js.git" />
				</Form.Item>

				<Flex justify="end">
					<Button type="primary" htmlType="submit" loading={loadingReleases}>
						Fetch Releases
					</Button>
				</Flex>
			</Form>
			<br />

			<ConditionalWrap condition={releases.length > 0}>
				<Collapse
					defaultActiveKey={["1"]}
					items={[
						{
							key: 1,
							label: "Releases",
							children: (
								<>
									<ReleaseSelector
										options={releases.map((release) => ({
											label: release.name,
											value: release.id,
										}))}
										checkedList={checkedList}
										setCheckedList={setCheckedList}
									/>
									<Button
										type="dashed"
										style={{
											marginTop: 16,
										}}
										onClick={handleFetchMore}
										loading={loadingMoreReleases}
									>
										Load more
									</Button>
								</>
							),
						},
					]}
				></Collapse>
			</ConditionalWrap>

			<ConditionalWrap condition={checkedList.length > 0}>
				<ShowReleaseMessages
					releases={releases}
					selected={checkedList}
					setSelected={setCheckedList}
				/>
			</ConditionalWrap>
		</>
	);
};

export default Differ;
