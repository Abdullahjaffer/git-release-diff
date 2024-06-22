import { Checkbox, Divider, Flex, Input } from "antd";
import React, { useState } from "react";
const CheckboxGroup = Checkbox.Group;

const ReleaseSelector = ({ options, checkedList, setCheckedList }) => {
	const [hideCanary, setHideCanary] = useState(true);

	const [searchText, setSeachText] = useState("");

	const checkAll = options.length === checkedList.length;
	const indeterminate =
		checkedList.length > 0 && checkedList.length < options.length;
	const onChange = (list) => {
		setCheckedList(list);
	};
	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? options.map(({ value }) => value) : []);
	};

	let showableOptions = options.filter((o) =>
		o.label.toLowerCase().includes(searchText.toLowerCase())
	);

	if (hideCanary) {
		showableOptions = showableOptions.filter(
			(o) => !o.label.includes("canary")
		);
	}

	return (
		<>
			<Flex justify="space-between" align="center">
				<Checkbox
					indeterminate={indeterminate}
					onChange={onCheckAllChange}
					checked={checkAll}
				>
					Check all
				</Checkbox>
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
					<Checkbox
						onChange={() => {
							setHideCanary(!hideCanary);
						}}
						checked={hideCanary}
					>
						Hide Canary
					</Checkbox>
				</Flex>
			</Flex>
			<Divider />
			<div
				style={{
					maxHeight: 300,
					overflowY: "scroll",
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
