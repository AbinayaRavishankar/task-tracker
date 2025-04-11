function Header({ username, onLogout }) {
  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold ml-3">Task Tracker</h1>
      {username && (
        <div className="flex items-center gap-4">
          <span className="font-medium">Hi, {username}</span>
          <button
            onClick={onLogout}
            className="bg-white text-blue-600 font-semibold px-4 py-1 rounded-md hover:bg-blue-100 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
