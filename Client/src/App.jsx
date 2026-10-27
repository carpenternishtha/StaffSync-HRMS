
import { useState } from 'react'
import './App.css'

const initialEmployees = [
  { id: 1, name: 'Aarav Sharma', role: 'Software Engineer', department: 'Engineering', status: 'Present' },
  { id: 2, name: 'Priya Patel', role: 'HR Executive', department: 'Human Resources', status: 'Present' },
  { id: 3, name: 'Rohan Verma', role: 'UI/UX Designer', department: 'Design', status: 'On Leave' },
  { id: 4, name: 'Ananya Singh', role: 'Marketing Executive', department: 'Marketing', status: 'Present' },
]

function App() {
  const [page, setPage] = useState('Dashboard')
  const [employees, setEmployees] = useState(initialEmployees)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('Engineering')
  const [notice, setNotice] = useState('')

  const present = employees.filter(e => e.status === 'Present').length
  const onLeave = employees.filter(e => e.status === 'On Leave').length

  function addEmployee(event) {
    event.preventDefault()
    if (!name.trim() || !role.trim()) return
    setEmployees([...employees, {
      id: Date.now(), name: name.trim(), role: role.trim(),
      department, status: 'Present'
    }])
    setName('')
    setRole('')
    setShowForm(false)
    setNotice('Employee added successfully!')
  }

  const filtered = employees.filter(e =>
    `${e.name} ${e.role} ${e.department}`.toLowerCase().includes(search.toLowerCase())
  )

  const menu = ['Dashboard', 'Employees', 'Attendance', 'Leave Management', 'Departments']

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon">S</span><span>Staff<span className="brand-light">Sync</span><small>HUMAN RESOURCE MANAGEMENT</small></span></div>
        <p className="menu-label">WORKSPACE</p>
        {menu.map(item => (
          <button key={item} className={`nav-item ${page === item ? 'active' : ''}`} onClick={() => { setPage(item); setNotice('') }}>
            <span>{({ Dashboard: '▦', Employees: '♙', Attendance: '◷', 'Leave Management': '▤', Departments: '▥' })[item]}</span>{item}
          </button>
        ))}
        <div className="sidebar-bottom"><div className="avatar">HR</div><div><strong>HR Administrator</strong><small>Administrator</small></div></div>
      </aside>

      <main className="main-area">
        <header className="topbar"><div><span className="breadcrumb">Workspace / </span><strong>{page}</strong></div><div className="top-actions"><span className="today">● System Online</span><div className="avatar">HR</div></div></header>

        <section className="content">
          <div className="welcome"><div><p className="eyebrow">HUMAN RESOURCES OVERVIEW</p><h1>{page === 'Dashboard' ? 'Good evening! 👋' : page}</h1><p className="muted">{page === 'Dashboard' ? 'Here is what is happening with your team today.' : `Manage your organisation’s ${page.toLowerCase()} in one place.`}</p></div><button className="primary-btn" onClick={() => { setShowForm(!showForm); setNotice('') }}>＋ Add Employee</button></div>

          {notice && <div className="notice">{notice}</div>}

          {showForm && <form className="employee-form" onSubmit={addEmployee}><h3>Add a new employee</h3><div className="form-grid"><label>Full name<input value={name} onChange={e => setName(e.target.value)} placeholder="Enter employee name" required /></label><label>Job title<input value={role} onChange={e => setRole(e.target.value)} placeholder="Enter job title" required /></label><label>Department<select value={department} onChange={e => setDepartment(e.target.value)}><option>Engineering</option><option>Human Resources</option><option>Design</option><option>Marketing</option><option>Finance</option></select></label></div><button className="primary-btn" type="submit">Save Employee</button> <button className="secondary-btn" type="button" onClick={() => setShowForm(false)}>Cancel</button></form>}

          {page === 'Dashboard' && <>
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-top"><span>Total Employees</span><span className="stat-icon purple">♙</span></div><h2>{employees.length}</h2><p>Registered team members</p></div>
              <div className="stat-card"><div className="stat-top"><span>Present Today</span><span className="stat-icon green">✓</span></div><h2>{present}</h2><p>Employees marked present</p></div>
              <div className="stat-card"><div className="stat-top"><span>On Leave</span><span className="stat-icon orange">◷</span></div><h2>{onLeave}</h2><p>Employees currently away</p></div>
              <div className="stat-card"><div className="stat-top"><span>Departments</span><span className="stat-icon blue">▦</span></div><h2>{new Set(employees.map(e => e.department)).size}</h2><p>Active departments</p></div>
            </div>
            <div className="section-heading"><div><h2>Employee Directory</h2><p className="muted">A quick view of your team</p></div><button className="text-btn" onClick={() => setPage('Employees')}>View all →</button></div>
          </>}

          {page !== 'Dashboard' && <div className="section-heading"><div><h2>{page === 'Employees' ? 'Employee Directory' : page}</h2><p className="muted">{page === 'Employees' ? 'Search and manage your employees.' : 'A simple overview for your HR team.'}</p></div></div>}

          {page === 'Attendance' && <div className="info-panel"><h3>Today's Attendance</h3><p>{present} employees present and {onLeave} employees on leave.</p><p className="muted">Attendance records shown here are sample data for the project demonstration.</p></div>}
          {page === 'Leave Management' && <div className="info-panel"><h3>Leave Overview</h3><p>{onLeave} employee(s) currently marked as on leave.</p><p className="muted">Leave approval workflows can be added as a next project feature.</p></div>}
          {page === 'Departments' && <div className="department-grid">{[...new Set(employees.map(e => e.department))].map(d => <div className="department-card" key={d}><span className="stat-icon blue">▦</span><h3>{d}</h3><p>{employees.filter(e => e.department === d).length} team member(s)</p></div>)}</div>}

          {(page === 'Dashboard' || page === 'Employees') && <div className="table-card"><div className="table-toolbar"><h3>Team Members <span className="count">{filtered.length}</span></h3><input className="search-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..." /></div><div className="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>JOB TITLE</th><th>DEPARTMENT</th><th>STATUS</th></tr></thead><tbody>{filtered.map(e => <tr key={e.id}><td><div className="employee-cell"><span className="employee-avatar">{e.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span><strong>{e.name}</strong></div></td><td>{e.role}</td><td>{e.department}</td><td><span className={`status ${e.status === 'Present' ? 'present' : 'leave'}`}>{e.status}</span></td></tr>)}{filtered.length === 0 && <tr><td colSpan="4">No employees found.</td></tr>}</tbody></table></div></div>}

          <footer>© 2026 StaffSync HRMS · Staff management made simpler.</footer>
        </section>
      </main>
    </div>
  )
}

export default App
