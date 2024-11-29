import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { theme } from '../utils/theme';
import { toggleMode } from '../store/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const mode = useSelector((state: RootState) => state.mode.mode); // Retrieve mode from Redux
  const th = theme(mode); // Get theme based on mode
  const dispatch = useDispatch();

  return (
    <header
      className={`flex items-center justify-between px-4 py-2 border-b transition-all duration-500`}
      style={{
        backgroundColor: th.primary,
        borderBottomColor: th.tertiary,
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src="https://www.svgrepo.com/show/231645/swap.svg"
          alt="Logo"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <h1
          className="text-xl font-bold ml-2 transition-all duration-500"
          style={{ color: th.font }}
        >
          Token Swaper
        </h1>
      </div>

      {/* Theme Toggle */}
      <button
        aria-label="Toggle Theme"
        className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 shadow-md"
        style={{ backgroundColor: th.blue}}
        onClick={() => dispatch(toggleMode())}
      >
        <FontAwesomeIcon
          icon={mode === 'dark' ? faMoon : faSun}
          className="text-white"
        />
      </button>
    </header>
  );
};

export default Header;
