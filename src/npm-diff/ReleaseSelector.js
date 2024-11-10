import { Checkbox, Divider, Flex, Input } from "antd";
import React, { useState } from "react";
const CheckboxGroup = Checkbox.Group;

const ReleaseSelector = ({ options, checkedList, setCheckedList }) => {
	const [searchText, setSeachText] = useState("");

	const onChange = (list) => {
		setCheckedList(list);
	};

	let showableOptions = options.filter((o) =>
		o.label.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
		<>
			<Flex justify="end" align="center">
				<Flex gap={4} align="center">
					<Input.Search
						placeholder="Filter releases"
						allowClear
						style={{
							width: 300,
						}}
						value={searchText}
						onChange={(e) => setSeachText(e.target.value)}
					/>
				</Flex>
			</Flex>
			<Divider />
			<div
				style={{
					maxHeight: 300,
					overflowY: "auto",
				}}
			>
				<CheckboxGroup
					options={showableOptions.map((o) => ({
						label: (
							<span
								style={{
									width: 160,
									display: "inline-block",
								}}
							>
								{o.label}
							</span>
						),
						value: o.value,
					}))}
					value={checkedList}
					onChange={onChange}
				/>
			</div>
		</>
	);
};
export default ReleaseSelector;
