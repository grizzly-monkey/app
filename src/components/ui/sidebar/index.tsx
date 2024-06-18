import styles from './SideBar.module.scss'
import classNames from 'classnames'

interface SideBarProps {
    isOpen: boolean
    children: React.ReactNode
}

const SideBar = ({ isOpen, children }:SideBarProps) => {
    return (
      <div className={classNames(styles.sidebar, { [styles.sidebar__toggled]: isOpen })}>
        {isOpen ? children : null}
      </div>
    )
  }

export default SideBar