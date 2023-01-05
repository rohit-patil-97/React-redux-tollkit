import React from "react"
import Form from "./Form"

const Table = ({ companyList, postUser, updateUser, deleteUser,usersList }) => {
	const showUpdateUser = id => {
		const form = document.getElementsByClassName(`show-form-${id}`)
		form[0].classList.toggle("hide-form")
	}

	const getCompanyName = (userData) => {
		const filterCompany = companyList.find((item)=>Number(item.id) === Number(userData.companiesId));
		return filterCompany?.name
	}

	const removeUser = (userID) =>{
		let text = "Are sure to Remove This user...";
		if (window.confirm(text) == true) {
			deleteUser(userID);
		}
	}
	const Row = ({ user }) => {
		return (
			<>
				<tr>
					<td>{user?.name}</td>
					<td>{user?.email}</td>
					<td>{user?.phone}</td>
					<td>{user?.companies?.name || getCompanyName(user)}</td>
					<td className='buttons'>
						<button className="btn btn-info" onClick={() => showUpdateUser(user?.id)}>Update</button>
						<button className="btn btn-danger"  onClick={() => removeUser(user.id)}>Delete</button>
					</td>
				</tr>
				<td colSpan={5}>
					<div className={`hide-form show-form-${user?.id}`}>
						<Form userData={user} postUser={postUser} updateUser={updateUser} />
					</div>
				</td>

			</>
		)
	}

	return (
		<>
		<table className="table">

			<thead className="table-dark">
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Phone</th>
				<th>Company</th>
				<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			{usersList?.length > 0 && usersList?.map(u => <Row user={u} key={u?.id} />)}
			</tbody>
		</table>
		</>)
}

export default Table
