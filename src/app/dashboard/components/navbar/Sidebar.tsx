import Logo from "@/app/(login)/components/Logo";

const Sidebar = () => {
  return (
    <aside className="bg-slate-300 w-1/6 py-4 px-4">
      <nav className="flex flex-col gap-4">
        <div className="flex justify-center">
          <Logo />
        </div>
        <ul>
          <li>
            <a href="#"> Dashboard</a>
          </li>
          <li>
            <a href="#">Users</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
