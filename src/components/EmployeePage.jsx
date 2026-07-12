import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import EmployeeTable from "./EmployeeTable";
import styles from "./DashboardPage.module.css";

export default function EmployeesPage({
  onNavigate = () => {},
}) {
  return (
    <div className={styles.shell}>
      <Sidebar
        activePath="/employees"
        onNavigate={onNavigate}
      />

      <div className={styles.main}>
        <Navbar title="Employees" />

        <div className={styles.content}>
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
}