import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const MenuContext = createContext(null);

const COURSES = ['Starter', 'Main Course', 'Dessert', 'Beverage'];

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);

  const addMenuItem = useCallback(({ dishName, description, course, price }) => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price)
    };
    setMenuItems((current) => [...current, item]);
    return item;
  }, []);

  const updateMenuItem = useCallback((id, { dishName, description, course, price }) => {
    let updated = null;
    setMenuItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        updated = {
          ...item,
          dishName: dishName.trim(),
          description: description.trim(),
          course,
          price: Number(price)
        };
        return updated;
      })
    );
    return updated;
  }, []);

  const removeMenuItem = useCallback((id) => {
    setMenuItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const getMenuItemById = useCallback(
    (id) => menuItems.find((item) => item.id === id) || null,
    [menuItems]
  );

  const totalPrice = useMemo(
    () => menuItems.reduce((sum, item) => sum + item.price, 0),
    [menuItems]
  );

  const averagePrice = useMemo(() => {
    if (menuItems.length === 0) return 0;
    return totalPrice / menuItems.length;
  }, [menuItems, totalPrice]);

  const courseCounts = useMemo(() => {
    const counts = {};
    COURSES.forEach((course) => {
      counts[course] = menuItems.filter((item) => item.course === course).length;
    });
    return counts;
  }, [menuItems]);

  const value = useMemo(
    () => ({
      menuItems,
      addMenuItem,
      updateMenuItem,
      removeMenuItem,
      getMenuItemById,
      totalPrice,
      averagePrice,
      courseCounts,
      COURSES
    }),
    [
      menuItems,
      addMenuItem,
      updateMenuItem,
      removeMenuItem,
      getMenuItemById,
      totalPrice,
      averagePrice,
      courseCounts
    ]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used inside MenuProvider');
  }
  return context;
}

export { COURSES };
