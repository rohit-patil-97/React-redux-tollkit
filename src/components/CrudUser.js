import React, { useState, useEffect } from "react"
import Form from "./Form"
import Table from "./Table"

import { httpHelper } from "../helpers/httpHelper"
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../store/userApi";

const CrudUser = () => {
	const [users, setUsers] = useState(null)

	const url = "http://localhost:5000/users"
	const api = httpHelper()

	const usersData = useSelector((state) => state.users);
	const { usersList, status, error, companyList} = usersData;

	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getAllUsers())
		}
	}, [status,dispatch]);


	useEffect(() => {
		getUsers()
	}, []);

	const postUser = user => {
		api
			.post(`${url}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	// const updateUser = (id, user) => {
	// 	api
	// 		.put(`${url}/${id}`, { body: user })
	// 		.then(res => getUsers())
	// 		.catch(err => console.log(err))
	// }

	const deleteUser = id => {
		api
			.del(`${url}/${id}`, {})
			.then(res => dispatch(getAllUsers()))
			.catch(err => console.log(err))
	}

	const getUsers = () => {
		api
			.get(`${url}?_expand=companies`)
			.then(res => {
				setUsers(res)
			})
			.catch(err => console.log(err))
	}

	if (!usersList) return null
	return (
		<>
			<h3>New user</h3>
			<Form postUser={postUser} />
			<div className='all-users'>
				<h3>All users</h3>
				<Table
					users={users}
					usersList={usersList}
					setUsers={setUsers}
					deleteUser={deleteUser}
					companyList={companyList}
				/>
			</div>
		</>
	)
}

export default CrudUser
