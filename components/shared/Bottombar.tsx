"use client"

import { ICategory } from "@/lib/models/category";
import NavOptions from "./NavOptions";
import CustomThemeProvider from '@/components/shared/CustomThemeProvider';

export default async function Bottombar(props: { categories: ICategory[] }) {
  return (
    <CustomThemeProvider>
      <section className="bottombar">
        <div className="bottombar_container">
          <NavOptions position="bottombar" categories={props.categories} />
        </div>
      </section>
    </CustomThemeProvider>
  );
}