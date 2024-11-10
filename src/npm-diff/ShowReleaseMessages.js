import { useQuery } from "@tanstack/react-query";
import {
	Card,
	Checkbox,
	Col,
	Divider,
	Flex,
	notification,
	Row,
	Spin,
} from "antd";
import axios from "axios";
import { useState } from "react";
import Markdown from "react-markdown";

const ReleaseCard = ({ release, showOnlyBreaking }) => {
	const [api, contextHolder] = notification.useNotification();
	const { data, isLoading } = useQuery({
		queryKey: [release.name, release.version],
		queryFn: async () => {
			const repository = release.repository.url;
			const repoMatch = repository.match(/github\.com\/([^/]+)\/([^/]+)\.git/);
			const owner = repoMatch[1];
			const repo = repoMatch[2];

			try {
				// first try to get the release by version
				let res = await axios
					.get(
						`https://api.github.com/repos/${owner}/${repo}/releases/tags/v${release.version}`
					)
					.then((res) => res.data);

				return res;
			} catch (e) {
				// if that fails, try to get the release by npm _id
				let res = await axios
					.get(
						`https://api.github.com/repos/${owner}/${repo}/releases/tags/${release._id}`
					)
					.then((res) => res.data)
					.catch((e) => {
						api.error({
							message: `Error fetching releases`,
							description: `Error fetching release ${release.version} for ${release.name}`,
						});
						throw e;
					});

				return res;
			}
		},
		enabled: !!release.repository.url,
		networkMode: "offlineFirst",
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	if (!release.repository.url) {
		console.log(JSON.stringify(release, null, 2));
		return null;
	}

	if (showOnlyBreaking && !isLoading) {
		if (!data?.body.toLowerCase().includes("breaking change")) {
			return null;
		}
	}

	return (
		<Col span={8}>
			{contextHolder}
			<Card title={release.version}>
				<div
					style={{
						height: 400,
						overflow: "auto",
					}}
				>
					{isLoading && (
						<div
							style={{
								height: 400,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Spin />
						</div>
					)}
					{!isLoading && data && <Markdown>{data.body}</Markdown>}
				</div>
			</Card>
		</Col>
	);
};

const ShowReleaseMessages = ({ releases, selected, setSelected }) => {
	const [showOnlyBreaking, setShowOnlyBreaking] = useState(false);
	let releasesToShow = releases.filter((release) => {
		return selected.includes(release.version);
	});

	return (
		<>
			<Divider />
			<Flex justify="end" align="center">
				<Checkbox
					onChange={(e) => setShowOnlyBreaking(e.target.checked)}
					checked={showOnlyBreaking}
				>
					Show only with breaking changes
				</Checkbox>
			</Flex>
			<Row
				style={{
					marginTop: 16,
				}}
				gutter={[16, 16]}
			>
				{releasesToShow.map((el) => (
					<ReleaseCard
						release={el}
						key={el.version}
						showOnlyBreaking={showOnlyBreaking}
					/>
				))}
			</Row>
		</>
	);
};

export default ShowReleaseMessages;
