"use client"

import { ICategory } from "@/lib/models/category";
import NavOptions from "./NavOptions";

export default async function Bottombar(props: { categories: ICategory[] }) {
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        <NavOptions position="bottombar" categories={props.categories} />
      </div>
    </section>
  );
}