'use client'

import Link from 'next/link'
import { IconFilePlus, IconListCheck } from '@tabler/icons-react'
import { slide as Menu } from 'react-burger-menu'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logout from './Logout'
import { DarkModeToggle } from '../ui/dark-mode-toggle'
import NavOptions from './NavOptions'
import CustomThemeProvider from '@/components/shared/CustomThemeProvider'
import { ICategory } from '@/lib/models/category'
import RightSidebar from './RightSidebar'
import { IIcon } from '@/lib/models/icon'
import { IToDo } from '@/lib/models/todo'

export default function Topbar(props: {
  categories: ICategory[];
  icons: IIcon[];
  userId: string;
}) {
	const [categoryList, setCategoryList] = useState<ICategory[]>(
		props.categories
	)
	const [open, setOpen] = useState<boolean>(false)
	const [rightSideBarOpen, setRightSideBarOpen] = useState<boolean>(false)
	const router = useRouter()

	const pullRightSideBarOpen = (data: boolean) => {
		const state = {
			isOpen: false
		}
		isMenuOpen(state)
		router.refresh()
	}
	const pullData = (data: ICategory[]) => {

	}
	const pullToDo = (data: IToDo) => {
		const updatedCategoryList = categoryList.map((category) => {
			if (category._id === data.categoryId) {
				category.todoCount++
			}
			return category
		})
		setCategoryList(updatedCategoryList)
	}
	var isMenuOpen = function (state: {
    isOpen: boolean | ((prevState: boolean) => boolean);
  }) {
		setOpen(state.isOpen)
	}
	return (
    <CustomThemeProvider>
      <nav className="topbar">
        <Link
          href="/"
          className="flex
			items-center gap-4"
        >
          <IconListCheck
            stroke={1}
            strokeLinejoin="miter"
            height={28}
            width={28}
            className="text-dark-1 dark:text-light-1 max-sm:hidden"
          />
          <p
            className="text-2xl leading-6 font-bold
				text-dark-2 dark:text-light-1 max-sm:hidden"
          >
            Things To Do
          </p>
        </Link>
        <Menu
          burgerButtonClassName={"text-dark-1 dark:text-light-1"}
          customBurgerIcon={
            <IconListCheck
              stroke={1}
              strokeLinejoin="miter"
              height={28}
              width={28}
              className="text-dark-1 dark:text-light-1"
            />
          }
        >
          <NavOptions
            func={pullData}
            position="leftsidebar"
            categories={categoryList}
          />
        </Menu>
        <Menu
          isOpen={open}
          right
          className="addToDo"
          onStateChange={isMenuOpen}
          burgerButtonClassName={"text-dark-1 dark:text-light-1 ml-10"}
          customBurgerIcon={
            <IconFilePlus
              stroke={1}
              strokeLinejoin="miter"
              height={28}
              width={28}
              className="text-dark-1 dark:text-light-1"
            />
          }
        >
          <RightSidebar
            menuState={open}
            categories={categoryList}
            icons={props.icons}
            userId={props.userId}
            func={pullData}
            newToDo={pullToDo}
            pullRightSideBarOpen={pullRightSideBarOpen}
          />
        </Menu>
        <div className="flex items-center gap-1">
          <DarkModeToggle />
          <div className="block md:hidden"></div>
        </div>
        <Logout placement="top" />
      </nav>
    </CustomThemeProvider>
  );
}
