import { Button, Collapse, Flex, Form, Input, notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
import ReleaseSelector from "./ReleaseSelector";
import ShowReleaseMessages from "./ShowReleaseMessages";

const ConditionalWrap = ({ children, condition }) =>
	condition ? children : null;

const NpmDiff = () => {
	const [checkedList, setCheckedList] = useState([]);
	const [loadingReleases, setLoadingReleases] = useState(false);
	const [releases, setReleases] = useState([]);

	const [api, contextHolder] = notification.useNotification();
	const openNotification = (description) => {
		api.error({
			message: `Error fetching releases`,
			description: description,
		});
	};

	const handleFetchReleases = async ({ packageName }) => {
		setReleases(() => []);
		setLoadingReleases(true);
		try {
			let response = await axios
				.get(`https://registry.npmjs.org/${packageName}`)
				.then((res) => res.data);

			setReleases((releases) => [
				...releases,
				...Object.values(response.versions).filter((v) => !!v.repository.url),
			]);
		} catch (e) {
			openNotification(e.message);
		}
		setLoadingReleases(false);
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
					label="Package Name"
					name="packageName"
					rules={[
						{
							required: true,
							message: "Please enter a package name",
						},
						{
							validator: (_, value) => {
								if (!value.trim())
									return Promise.reject("Please enter a package name");
								return Promise.resolve();
							},
						},
					]}
					tooltip="This is a required field."
				>
					<Input placeholder="eg. @tanstack/react-query" />
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
											label: release.version,
											value: release.version,
										}))}
										checkedList={checkedList}
										setCheckedList={setCheckedList}
									/>
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

export default NpmDiff;
