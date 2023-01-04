import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper"
import {useDispatch, useSelector} from "react-redux";
import {getAllCompanies} from "../store/userApi";

const DropCompanies = ({ companiesId, handleValue }) => {
	// const [companies, setCompanies] = useState(null)
	const [company, setCompany] = useState(companiesId)
	// console.log("companiesId",companiesId)
	// const url = "http://localhost:5000/companies"
	// const api = httpHelper()
	const usersData = useSelector((state) => state.users);
	const { companyList, status, error } = usersData;
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getAllCompanies())
		}
	}, [status,dispatch]);

	// useEffect(() => {
	// 	api
	// 		.get(url)
	// 		.then(res => {
	// 			setCompanies([{ id: 0, name: "Select Company" }, ...res])
	// 		})
	// 		.catch(err => console.log(err))
	// }, [])

	if (!companyList) return null

	return (
		<select
			name='companiesId'
			value={company}
			onChange={e => {
				setCompany(e.target.value)
				handleValue(e)
			}}
		>
			{companyList?.map(c => (
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}

export default DropCompanies
