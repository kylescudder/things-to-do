'use client'

import React, { type ReactNode, useEffect, useState } from 'react'
import { type ICategory } from '@/lib/models/category'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { type IIcon } from '@/lib/models/icon'
import CustomThemeProvider from '@/components/shared/CustomThemeProvider'
import { type IToDo } from '@/lib/models/todo'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MainContent = (props: {
  categories: ICategory[] | null
  icons: IIcon[]
  userId: string
  children: ReactNode
}): JSX.Element => {
  const [categoryList, setCategoryList] = useState<ICategory[]>(
    props.categories ?? []
  )
  useEffect(() => {}, categoryList)

  const pullData = async (data: ICategory[]): Promise<void> => {
    const newCatList = [...data]
    newCatList.sort((a, b) => a.text.localeCompare(b.text))
    setCategoryList(newCatList)
  }
  const pullToDo = (data: IToDo): void => {
    const updatedCategoryList = categoryList?.map((category) => {
      if (category._id === data.categoryId) {
        category.todoCount += 1
      }
      return category
    })

    setCategoryList(updatedCategoryList)
  }
  const pullRightSideBarOpen = (): void => {}

  const addNewCategory = (data: ICategory): void => {
    setCategoryList([...categoryList, data])
  }
  return (
    <CustomThemeProvider>
      <main className='flex flex-row'>
        <LeftSidebar func={pullData} categories={categoryList} />
        <section
          className='flex min-h-screen flex-1 flex-col items-center bg-light-1
				dark:bg-dark-1 px-6 pb-10 pt-16 max-md:pb-32 sm:px-10'
        >
          <div className='w-full max-w-4xl min-h-full'>{props.children}</div>
        </section>
        <RightSidebar
          menuState={false}
          categories={categoryList}
          icons={props.icons}
          userId={props.userId}
          func={pullData}
          newToDo={pullToDo}
          addNewCategory={(data: ICategory) => {
            addNewCategory(data)
          }}
          pullRightSideBarOpen={pullRightSideBarOpen}
        />
      </main>
    </CustomThemeProvider>
  )
}

export default MainContent
