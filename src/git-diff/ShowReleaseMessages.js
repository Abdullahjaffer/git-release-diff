import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Divider, Flex, Row } from "antd";
import { useState } from "react";
import Markdown from "react-markdown";

const ShowReleaseMessages = ({ releases, selected, setSelected }) => {
	const [showOnlyBreaking, setShowOnlyBreaking] = useState(false);
	let releasesToShow = releases
		.filter((release) => {
			return selected.includes(release.id);
		})
		.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
	if (showOnlyBreaking) {
		releasesToShow = releasesToShow.filter((release) =>
			release.body.toLowerCase().includes("breaking change")
		);
	}
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
					<Col span={8} key={el.id}>
						<Card
							title={el.name}
							extra={
								<Button
									type="text"
									icon={<CloseOutlined />}
									onClick={() => {
										setSelected(selected.filter((id) => id !== el.id));
									}}
								/>
							}
						>
							<div
								style={{
									height: 400,
									overflow: "auto",
								}}
							>
								<Markdown>{el.body}</Markdown>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};

export default ShowReleaseMessages;
