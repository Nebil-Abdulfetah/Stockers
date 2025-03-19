import React from 'react'

function Nav() {
  return (
   <>
   <aside>
        <ul className={styles.top_nav_item_list}>
          <li className="nav_item">
            <a href="" className="nav_link">
              Dashboard
            </a>
          </li>
          <li className="nav_item">
            <a href="" className="nav_link">
              Stocks
            </a>
          </li>
          <li className="nav_item">
            <a href="" className="nav_link">
              Credits
            </a>
          </li>
          <li className="nav_item">
            <a href="" className="nav_link">
              Users
            </a>
          </li>
          <li className="nav_item">
            <a href="" className="nav_link">
              Employees
            </a>
          </li>
        </ul>
        <ul className={styles.bottom_nav_item_list}>
          <li className="nav_item" onClick={handleLogout}>
            <a href="" className={styles.logout}>
              Logout
            </a>
          </li>
          <li className="user-info">
            <div className={styles.username}>Nebil Abdulfetah</div>
          </li>
        </ul>
      </aside>
   </>
  )
}

export default Nav