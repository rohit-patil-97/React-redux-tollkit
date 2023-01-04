import React, { useState } from "react"
import DropComapies from "./DropCompanies";
import { useDispatch } from 'react-redux';
import { addUser, updateUser} from '../store/userApi';
const Form = ({ userData = {}, postUser }) => {
	const dispatch = useDispatch();
	const [user, setUser] = useState({
		name: userData.name ?? "",
		username: userData.username ?? "",
		email: userData.email ?? "",
		phone: userData.phone ?? "",
		companiesId: userData.companiesId ?? "0",
	});

	const resetValues = () =>{
		setUser({
			name:  "",
			username:  "",
			email:  "",
			phone:  "",
			companiesId:  "0",
		})
	}
	const handleValue = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const submitUser = async (e) => {
		e.preventDefault()

		if (user.companiesId === "0") return

		if (userData?.id) {
			const payload = {
				id:userData?.id,
				data:user
			}
			// updateUser(userData.id, user)
			await dispatch(updateUser(payload));

		} else {

			await dispatch(addUser(user));
			resetValues();
		}
	}

	return (
		<form onSubmit={submitUser} className='row'>
			<input
				type='text'
				name='name'
				value={user.name}
				placeholder='Name'
				onChange={e => handleValue(e)}
			/>
			<input
				type='email'
				name='email'
				value={user.email}
				placeholder='Email'
				onChange={e => handleValue(e)}
			/>
			<input
				type='tel'
				name='phone'
				value={user.phone}
				placeholder='Phone (10)'
				pattern='[0-9]{10}'
				onChange={e => handleValue(e)}
			/>
			<DropComapies companiesId={user.companiesId} handleValue={handleValue} />
			<input
				className='btn-submit'
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`}
			/>
		</form>
	)
}

export default Form
