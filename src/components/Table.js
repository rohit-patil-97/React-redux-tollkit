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
	const Row = ({ user }) => {
		return (
			<>
				<div className='row'>
					<div>{user?.name}</div>
					<div>{user?.email}</div>
					<div>{user?.phone}</div>
					<div>{user?.companies?.name || getCompanyName(user)}</div>
					<div className='buttons'>
						<button onClick={() => showUpdateUser(user?.id)}>Update</button>
						<button onClick={() => deleteUser(user?.id)}>Delete</button>
					</div>
				</div>
				<div className={`hide-form show-form-${user?.id}`}>
					<Form userData={user} postUser={postUser} updateUser={updateUser} />
				</div>
			</>
		)
	}

	return (
		<div className='table'>
			<div className='titles'>
				<div>Name</div>
				<div>Email</div>
				<div>Phone</div>
				<div>Company</div>
				<div>Actions</div>
			</div>
			<div className='rows'>
				{usersList?.length > 0 && usersList?.map(u => <Row user={u} key={u?.id} />)}
			</div>
		</div>
	)
}

export default Table
